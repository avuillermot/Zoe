import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { IProduct} from '../_services/product/product.model';
import { ProductService } from '../_services/product/product.service';
import { IDocument, IItemLine } from '../_services/calcul-engine/calcul-engine.model';
import { CalculEngineService } from '../_services/calcul-engine/calcul-engine.service';

@Component({
  selector: 'app-quote-create',
  templateUrl: './quote-create.component.html',
  styleUrls: ['./quote-create.component.css']
})
export class QuoteCreateComponent implements OnInit {

  current: IProduct;
  products: IProduct[];
  document: IDocument;
  cols: any[];
  @ViewChild('dt') table: Table;

  constructor(private servProduct: ProductService, private servCalcul: CalculEngineService) {
    this.products = new Array<IProduct>();
    this.cols = new Array<any>();
    this.table = ViewChild('dt');
    this.current = { code: "", description: "", entityId: "", name: "", price: 0, taxPercent: 0, _id: "" };
    this.document = { items: new Array<IItemLine>(), total: 0, totalFreeTax: 0, taxAmount: 0, date: new Date() };

    this.cols.push({ field: "name", header: "Nom" });
    this.cols.push({ field: "price", header: "Prix unitaire HT" });
    this.cols.push({ field: "taxPercent", header: "Taxe (%)" });
    this.cols.push({ field: "quantity", header: "Quantité" });
    this.cols.push({ field: "taxAmount", header: "Taxe" });
    this.cols.push({ field: "totalFreeTax", header: "Total HT" });
    this.cols.push({ field: "total", header: "Total TTC" });
  }

  ngOnInit() {
  }

  async search(event:any) {
    this.products = await this.servProduct.startWith(event.query);
  }

  async onSelectProduct(event: any): Promise<void> {
    let toAdd: IItemLine = <IItemLine>JSON.parse(JSON.stringify(this.current));
    toAdd.quantity = 1;
    this.document.items.push(toAdd);
    this.document = await this.servCalcul.send(this.document);
    this.current = { code: "", description: "", entityId: "", name: "", price: 0, taxPercent: 0, _id: "" };
  }

  async onChangeDocument(): Promise<void> {
    this.document = await this.servCalcul.send(this.document);
  }
}
