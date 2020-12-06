import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from "@angular/router";
import { Table } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';
import { IProduct} from '../_services/product/product.model';
import { ICustomer } from '../_services/customer/customer.model';
import { UserService } from '../_services/user/user.service';
import { ProductService } from '../_services/product/product.service';
import { CalculEngineService } from '../_services/calcul-engine/calcul-engine.service';
import { IQuote, IItemLine, IStatus } from '../_services/calcul-engine/calcul-engine.model';
import { CustomerService } from '../_services/customer/customer.service';
import { WorkflowSendMailService } from '../_services/worfklow-send-mail/workflow-send-mail.service';
import { WorkflowHelperService } from '../_services/worfklow-helper/workflow-helper.service';
import { environment } from '../../environments/environment';
import * as moment from 'moment';


@Component({
  selector: 'app-quote-update',
  templateUrl: './quote-update.component.html',
  styleUrls: ['./quote-update.component.css'],
  providers: [ConfirmationService]
})
export class QuoteUpdateComponent implements OnInit {

  customers: ICustomer[];
  //product: IProduct;
  //products: IProduct[];
  document: IQuote;
  //cols: any[];
  urlPdf: SafeResourceUrl;
  @ViewChild('dt') table: Table;
  typeDocument: string = "";
  blocked: boolean = false;
  popupDisplay: boolean = false;
  popupMessage: string = "";

  constructor(private servProduct: ProductService, private servCustomer: CustomerService, private servCalcul: CalculEngineService,
    private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer,
    private confirmationService: ConfirmationService) {

    this.urlPdf = this.sanitizer.bypassSecurityTrustResourceUrl("");
    this.customers = new Array<ICustomer>();
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
      this.document = await this.servCalcul.getQuote(id);
      // force date to date object to be set in calendar
      this.document.date = new Date(this.document.date);
      this.document.expirationDate = new Date(this.document.expirationDate);
      this.typeDocument = "Devis"
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

  async searchCustomer(event: any) {
    this.customers = await this.servCustomer.startWith(event.query);
  }

  async onSelectCustomer(): Promise<void> {
    document.querySelector('#findCustomer')?.classList.remove('ng-invalid');
  }

  async onUnselectCustomer(): Promise<void> {
    document.querySelector('#findCustomer')?.classList.add('ng-invalid');
  }

  async onKeyupCustomer(): Promise<void> {
    if (this.document.customer.number == null || this.document.customer.number == undefined)
      document.querySelector('#findCustomer')?.classList.add('ng-invalid');
  }

  async onSave(): Promise<void> {
    let elems: NodeListOf<Element> = document.querySelectorAll('.ng-invalid');
    if (elems.length == 0) {
      let id: string | null = this.route.snapshot.paramMap.get("id");
      if (id == null) {
        this.blocked = true;
        try {
          let back: { id: string } = await this.servCalcul.createQuote(this.document);
          this.router.navigate(['quote/update/' + back.id])
        }
        catch (ex) {
          this.displayMessage(ex.error);
        }
      }
      else await this.servCalcul.updateQuote(this.document);
    }
    else this.displayMessage("Veuillez remplir les champs obligatoires.");
  }

  async runLock(): Promise<void> {
    let elems: NodeListOf<Element> = document.querySelectorAll('.ng-invalid');
    if (elems.length == 0) {
      this.blocked = true;
      try {
        await this.servCalcul.lockQuote(this.document);
      }
      catch (ex) {
        this.displayMessage(ex.error);
      }
      this.blocked = false;
      this.document = await this.servCalcul.getQuote(this.document._id);
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

  onChangeTab(event: any): void {
    if (event.index == 2) {
      let self = this;
      let fn = function () {
        let id: string | null = self.route.snapshot.paramMap.get("id");
        if (id != null) self.urlPdf = self.sanitizer.bypassSecurityTrustResourceUrl(environment.services.calculEngine + "quote/pdf?id=" + id);
      };
      window.setTimeout(fn, 500);
    }
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
