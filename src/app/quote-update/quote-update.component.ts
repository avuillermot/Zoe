import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationService } from 'primeng/api';
import { UserService } from '../_services/user/user.service';
import { CalculEngineService } from '../_services/calcul-engine/calcul-engine.service';
import { DocumentEngineService } from '../_services/document-engine/document-engine.service';
import { IQuote, IItemLine, IStatus } from '../_services/calcul-engine/calcul-engine.model';
import { CustomerService } from '../_services/customer/customer.service';
import { WorkflowSendMailService } from '../_services/worfklow-send-mail/workflow-send-mail.service';
import { WorkflowHelperService } from '../_services/worfklow-helper/workflow-helper.service';
import * as moment from 'moment';
import { ChildTabpanelViewpdfComponent } from '../child-tabpanel-viewpdf/child-tabpanel-viewpdf.component'


@Component({
  selector: 'app-quote-update',
  templateUrl: './quote-update.component.html',
  styleUrls: ['./quote-update.component.css'],
  providers: [ConfirmationService]
})
export class QuoteUpdateComponent implements OnInit {

  document: IQuote;
  typeDocument: string = "Devis";
  blocked: boolean = false;
  popupDisplay: boolean = false;
  popupMessage: string = "";
  @ViewChild(ChildTabpanelViewpdfComponent) child: ChildTabpanelViewpdfComponent;

  constructor(private servCustomer: CustomerService, private servCalcul: CalculEngineService, private servDocument: DocumentEngineService,
    private route: ActivatedRoute, private router: Router, private cd: ChangeDetectorRef, private confirmationService: ConfirmationService) {

    this.child = ViewChild('header');
    this.document = {
      _id: "", items: new Array<IItemLine>(), total: 0, totalFreeTax: 0, taxAmount: 0, statusHistory: new Array<IStatus>(),
      date: moment.utc().toDate(), expirationDate: moment.utc().add(30, "days").toDate(), status: 'INIT', html: "",
      address1: "", address2: "", address3: "", zipCode: "", city:"", country:"", number: "",
      seller: {
        address1: "", address2: "", address3: "", zipCode: "", city: "", country: "", capital: 0,
        codeAPE: "", codeTVA: "", email: "", legalType: "", name: "", phone: "", siren: "", siret: ""
      },
      customer: {
        address1: "", address2: "", address3: "", city: "", country: "", email: "",
        entityId: "", firstName: "", lastName: "", fullName: "", number: "", phone: "", zipCode: "", _id: ""
      }
    };
  }

  onVersion(args:any) {
    this.child.refresh(this.document);
  }

  async ngOnInit() {
    let cid: string | null = this.route.snapshot.paramMap.get("customer");
    if (cid != null) {
      this.document.customer = await this.servCustomer.get(cid);
    }

    let id: string | null = this.route.snapshot.paramMap.get("id");
    if (id != null) {
      this.document = await this.servDocument.get(id, 'quote');
      // force date to date object to be set in calendar
      this.document.date = new Date(this.document.date);
      this.document.expirationDate = new Date(this.document.expirationDate);
      this.child.refresh(this.document);
    }
  }

  async ngAfterViewChecked() {
    if (this.document.customer.number != null && this.document.customer.number != undefined && this.document.customer.number != "") {
      document.querySelector('#findCustomer')?.classList.remove('ng-invalid');
    }
    let container: Element |null = document.querySelector("#main-document");
    WorkflowHelperService.manageIcons(container, this.document.status);

    if (this.servDocument.isLocked(this.document.status)) {
      document.querySelectorAll("#main-document input")?.forEach((current:Element) => {
        current.setAttribute("disabled", "disabled");
      });
      document.querySelectorAll("#main-document .remove-item")?.forEach((current: Element) => {
        current.innerHTML = "";
      });
    }
  }

  // WORKFLOW

  async onAction(message:string, callback: any) {
    this.confirmationService.confirm({
      message: message,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        await callback();
      },
      reject: () => {
      }
    });
  }


  sendMail() {
    UserService.setReturnUrl(window.location.href);
    this.router.navigate([WorkflowSendMailService.navigateTo("quote", this.document._id)]);
  }

  cancelable(): boolean {
    return this.document.status == 'CREATE' || this.document.status == 'UPDATE';
  }

  cancel() {
    let self: any = this;
    let fn: any = function () {
      try {
        self.servDocument.cancel(self.document._id, "quote");
        self.router.navigate(['quote/cancel/' + self.document._id]);
      }
      catch (ex) {
        alert("Une erreur est survenue lors de l'annulation du devis.")
      }
    };
    this.onAction("Confirmer l'annulation du devis", fn);
  }

  accept() {
    let self: any = this;
    let fn: any = function () {
      try {
        self.servDocument.accept(self.document._id, "quote");
        self.router.navigate(['quote/accept/' + self.document._id]);
      }
      catch (ex) {
        alert("Une erreur est survenue lors de l'annulation du devis.")
      }
    };
    this.onAction("Confirmer l'acception du devis par le client", fn);
  }

  reject() {
    let self: any = this;
    let fn: any = function () {
      try {
        self.servDocument.reject(self.document._id, "quote");
        self.router.navigate(['quote/reject/' + self.document._id]);
      }
      catch (ex) {
        alert("Une erreur est survenue lors de l'annulation du devis.")
      }
    };
    this.onAction("Confirmer le refus du devis par le client", fn);
  }
}
