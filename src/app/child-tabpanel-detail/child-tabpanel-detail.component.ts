import { Component, Input } from '@angular/core';
import { IDocument, IItemLine } from '../_services/calcul-engine/calcul-engine.model';
import { CalculEngineService } from '../_services/calcul-engine/calcul-engine.service';
import { IProduct } from '../_services/product/product.model';
import { ProductService } from '../_services/product/product.service';

@Component({
  selector: 'app-child-tabpanel-detail',
  templateUrl: './child-tabpanel-detail.component.html',
  styleUrls: ['./child-tabpanel-detail.component.css']
})
export class ChildTabpanelDetailComponent {
  @Input() document: IDocument = <IDocument>{};
  product: IProduct;
  products: IProduct[];
  cols: any[];

  constructor(private servCalcul: CalculEngineService, private servProduct: ProductService) {
    this.product = { code: "", description: "", entityId: "", name: "", price: 0, taxPercent: 0, _id: "" };
    this.products = new Array<IProduct>();
    this.cols = new Array<any>();

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

  removeItemLine(order: number): void {
    this.document.items.splice(order - 1, 1);
    this.calculDocument();
  }

  async searchProduct(event: any) {
    this.products = await this.servProduct.startWith(event.query);
  }

  async onChangeDocument(): Promise<void> {
    await this.calculDocument();
  }

  async onSelectProduct(event: any): Promise<void> {
    let toAdd: IItemLine = <IItemLine>JSON.parse(JSON.stringify(this.product));
    toAdd.quantity = 1;
    this.document.items.push(toAdd);

    await this.calculDocument();

    this.product = { code: "", description: "", entityId: "", name: "", price: 0, taxPercent: 0, _id: "" };
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

}
