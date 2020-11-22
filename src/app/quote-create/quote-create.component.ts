import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Table } from 'primeng/table';
import { IProduct} from '../_services/product/product.model';
import { ICustomer } from '../_services/customer/customer.model';
import { ProductService } from '../_services/product/product.service';
import { IDocument, IItemLine } from '../_services/calcul-engine/calcul-engine.model';
import { CalculEngineService } from '../_services/calcul-engine/calcul-engine.service';
import { CustomerService } from '../_services/customer/customer.service';

@Component({
  selector: 'app-quote-create',
  templateUrl: './quote-create.component.html',
  styleUrls: ['./quote-create.component.css']
})
export class QuoteCreateComponent implements OnInit {

  customers: ICustomer[];
  product: IProduct;
  products: IProduct[];
  document: IDocument;
  cols: any[];
  @ViewChild('dt') table: Table;

  constructor(private servProduct: ProductService, private servCustomer: CustomerService, private servCalcul: CalculEngineService, private route: ActivatedRoute) {
    this.products = new Array<IProduct>();
    this.customers = new Array<ICustomer>();
    this.cols = new Array<any>();
    this.table = ViewChild('dt');
    this.product = { code: "", description: "", entityId: "", name: "", price: 0, taxPercent: 0, _id: "" };
    this.document = {
      items: new Array<IItemLine>(), total: 0, totalFreeTax: 0, taxAmount: 0, date: new Date(), expirationDate: new Date(),
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
  }

  async ngOnInit() {
    let cid: string | null = this.route.snapshot.paramMap.get("customer");
    if (cid != null) {
      this.document.customer = await this.servCustomer.get(cid);
    }
  }

  async searchProduct(event:any) {
    this.products = await this.servProduct.startWith(event.query);
  }

  async onSelectProduct(event: any): Promise<void> {
    let toAdd: IItemLine = <IItemLine>JSON.parse(JSON.stringify(this.product));
    toAdd.quantity = 1;
    this.document.items.push(toAdd);

    let result:IDocument = await this.servCalcul.send(this.document);

    this.document.items = result.items;
    this.document.total = result.total;
    this.document.totalFreeTax = result.totalFreeTax;
    this.document.taxAmount = result.taxAmount;

    let index: number = 1;
    this.document.items.forEach((value:any) => {
      value.order = index;
      index++;
    });
    this.product = { code: "", description: "", entityId: "", name: "", price: 0, taxPercent: 0, _id: "" };
  }

  async searchCustomer(event: any) {
    this.customers = await this.servCustomer.startWith(event.query);
  }

  async onChangeDocument(): Promise<void> {
    this.document = await this.servCalcul.send(this.document);
  }

  onSave(): void {

    this.servCalcul.createQuote(this.document);
  }
}
