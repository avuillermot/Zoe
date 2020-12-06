import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Table } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';
import { ICustomer } from '../_services/customer/customer.model';
import { UserService } from '../_services/user/user.service';
import { CalculEngineService } from '../_services/calcul-engine/calcul-engine.service';
import { IQuote, IItemLine, IStatus } from '../_services/calcul-engine/calcul-engine.model';
import { CustomerService } from '../_services/customer/customer.service';
import { WorkflowSendMailService } from '../_services/worfklow-send-mail/workflow-send-mail.service';
import { WorkflowHelperService } from '../_services/worfklow-helper/workflow-helper.service';
import * as moment from 'moment';


@Component({
  selector: 'app-quote-update',
  templateUrl: './quote-update.component.html',
  styleUrls: ['./quote-update.component.css'],
  providers: [ConfirmationService]
})
export class QuoteUpdateComponent implements OnInit {

  document: IQuote;
  @ViewChild('dt') table: Table;
  typeDocument: string = "Devis";
  blocked: boolean = false;
  popupDisplay: boolean = false;
  popupMessage: string = "";

  constructor(private servCustomer: CustomerService, private servCalcul: CalculEngineService,
    private route: ActivatedRoute, private router: Router, private confirmationService: ConfirmationService) {

    this.table = ViewChild('dt');
    this.document = {
      _id: "", items: new Array<IItemLine>(), total: 0, totalFreeTax: 0, taxAmount: 0, statusHistory: new Array<IStatus>(),
      date: moment.utc().toDate(), expirationDate: moment.utc().add(30, "days").toDate(), status: 'INIT',
      number: "",
      customer: {
        address1: "", address2: "", address3: "", city: "", country: "", email: "",
        entityId: "", firstName: "", lastName: "", fullName: "", number: "", phone: "", zipCode: "", _id: ""
      }
    };
  }

  async ngOnInit() {
    let cid: string | null = this.route.snapshot.paramMap.get("customer");
    if (cid != null) {
      this.document.customer = await this.servCustomer.get(cid);
    }

    let id: string | null = this.route.snapshot.paramMap.get("id");
    if (id != null) {
      this.document = await this.servCalcul.get(id, 'quote');
      // force date to date object to be set in calendar
      this.document.date = new Date(this.document.date);
      this.document.expirationDate = new Date(this.document.expirationDate);
    }
  }

  async ngAfterViewChecked() {
    if (this.document.customer.number != null && this.document.customer.number != undefined && this.document.customer.number != "") {
      document.querySelector('#findCustomer')?.classList.remove('ng-invalid');
    }
    let container: Element |null = document.querySelector("#main-quote");
    WorkflowHelperService.manageIcons(container, this.document.status);

    if (this.document.status == "LOCK") {
      document.querySelectorAll("#main-quote input")?.forEach((current:Element) => {
        current.setAttribute("disabled", "disabled");
      });
      document.querySelectorAll("#main-quote .remove-item")?.forEach((current: Element) => {
        current.innerHTML = "";
      });
    }
  }

  async onSave(): Promise<void> {
    let elems: NodeListOf<Element> = document.querySelectorAll('.ng-invalid');
    if (elems.length == 0) {
      let id: string | null = this.route.snapshot.paramMap.get("id");
      if (id == null) {
        this.blocked = true;
        try {
          let back: { id: string } = await this.servCalcul.create(this.document,'quote');
          this.router.navigate(['quote/update/' + back.id])
        }
        catch (ex) {
          this.displayMessage(ex.error);
        }
      }
      else await this.servCalcul.update(this.document, 'quote');
    }
    else this.displayMessage("Veuillez remplir les champs obligatoires.");
  }

  async runLock(): Promise<void> {
    let elems: NodeListOf<Element> = document.querySelectorAll('.ng-invalid');
    if (elems.length == 0) {
      this.blocked = true;
      try {
        await this.servCalcul.lock(this.document,'quote');
      }
      catch (ex) {
        this.displayMessage(ex.error);
      }
      this.blocked = false;
      this.document = await this.servCalcul.get(this.document._id, 'quote');
    }
    else this.displayMessage("Veuillez remplir les champs obligatoires.");
  }

  async onLock() {
    this.confirmationService.confirm({
      message: 'Voulez-vous valider ce devis ? Un devis validé ne pourra pas être modifié.',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: async() => {
        await this.runLock();
      },
      reject: () => {
      }
    });
  }

  displayMessage(message: string): void {
    if (message == null || message == undefined) this.popupMessage = "Une erreur est survenue"
    else this.popupMessage = message;
    this.popupDisplay = true;
    this.blocked = false;
  }

  // WORKFLOW
  sendMail() {
    UserService.setReturnUrl(window.location.href);
    this.router.navigate([WorkflowSendMailService.navigateTo("quote", this.document._id)]);
  }
}
