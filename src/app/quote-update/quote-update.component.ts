import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from "@angular/router";
import { Table } from 'primeng/table';
import { IProduct} from '../_services/product/product.model';
import { ICustomer } from '../_services/customer/customer.model';
import { ProductService } from '../_services/product/product.service';
import { CalculEngineService } from '../_services/calcul-engine/calcul-engine.service';
import { IDocument, IItemLine, DocumentHelper } from '../_services/calcul-engine/calcul-engine.model';
import { CustomerService } from '../_services/customer/customer.service';
import { environment } from '../../environments/environment';
import * as moment from 'moment';


@Component({
  selector: 'app-quote-update',
  templateUrl: './quote-update.component.html',
  styleUrls: ['./quote-update.component.css']
})
export class QuoteUpdateComponent implements OnInit {

  customers: ICustomer[];
  product: IProduct;
  products: IProduct[];
  document: IDocument;
  cols: any[];
  urlPdf: SafeResourceUrl;
  @ViewChild('dt') table: Table;
  typeDocument: string = "";

  constructor(private servProduct: ProductService, private servCustomer: CustomerService, private servCalcul: CalculEngineService,
    private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer) {

    this.urlPdf = this.sanitizer.bypassSecurityTrustResourceUrl("");
    this.products = new Array<IProduct>();
    this.customers = new Array<ICustomer>();
    this.cols = new Array<any>();
    this.table = ViewChild('dt');
    this.product = { code: "", description: "", entityId: "", name: "", price: 0, taxPercent: 0, _id: "" };
    this.document = {
      _id: "", items: new Array<IItemLine>(), total: 0, totalFreeTax: 0, taxAmount: 0, date: moment.utc().toDate(), expirationDate: moment.utc().add(30, "days").toDate(),
      number: "",
      customer: {
        address1: "", address2: "", address3: "", city: "", country: "", email: "",
        entityId: "", firstName: "", lastName: "", fullName: "", number: "?", phone: "", zipCode: "", _id: ""
      }
    };

    this.cols.push({ field: "order", header: "N°" });
    this.cols.push({ field: "name", header: "Nom" });
    this.cols.push({ field: "price", header: "Prix unitaire HT" });
    this.cols.push({ field: "taxPercent", header: "Taxe (%)" });
    this.cols.push({ field: "quantity", header: "Quantité" });
    this.cols.push({ field: "taxAmount", header: "Taxe" });
    this.cols.push({ field: "totalFreeTax", header: "Total HT" });
    this.cols.push({ field: "total", header: "Total TTC" });
    this.cols.push({ field: "order", header: "Supprimer" });
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
      if (this.document.customer.number != null || this.document.customer.number != undefined)
        document.querySelector('#findCustomer')?.classList.remove('ng-invalid');
    }
  }

  async searchProduct(event:any) {
    this.products = await this.servProduct.startWith(event.query);
  }

  async onSelectProduct(event: any): Promise<void> {
    let toAdd: IItemLine = <IItemLine>JSON.parse(JSON.stringify(this.product));
    toAdd.quantity = 1;
    this.document.items.push(toAdd);

    await this.calculDocument();

    this.product = { code: "", description: "", entityId: "", name: "", price: 0, taxPercent: 0, _id: "" };
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

  async onChangeDocument(): Promise<void> {
    await this.calculDocument();
  }

  async calculDocument(): Promise<void> {
    let result: IDocument = await this.servCalcul.send(this.document);

    this.document.items = result.items;
    this.document.total = result.total;
    this.document.totalFreeTax = result.totalFreeTax;
    this.document.taxAmount = result.taxAmount;

    let index: number = 1;
    this.document.items.forEach((value: any) => {
      value.order = index;
      index++;
    });
  }

  async onSave(): Promise<void> {
    let elems: NodeListOf<Element> = document.querySelectorAll('.ng-invalid');
    if (elems.length == 0) {
      let id: string | null = this.route.snapshot.paramMap.get("id");
      if (id == null) {
        let back: { id: string } = await this.servCalcul.createQuote(this.document);
        this.router.navigate(['quote/update/' + back.id])
      }
      else await this.servCalcul.updateQuote(this.document);
    }
    else alert("Des champs sont obligatoires.")
  }

  removeItemLine(order: number): void {
    this.document.items.splice(order - 1, 1);
    this.calculDocument();
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
}
