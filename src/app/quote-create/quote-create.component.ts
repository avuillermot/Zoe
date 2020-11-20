import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { IProduct } from '../_services/product/product.model';
import { ProductService } from '../_services/product/product.service';

@Component({
  selector: 'app-quote-create',
  templateUrl: './quote-create.component.html',
  styleUrls: ['./quote-create.component.css']
})
export class QuoteCreateComponent implements OnInit {

  current: IProduct;
  products: IProduct[];
  cols: any[];
  @ViewChild('dt') table: Table;

  constructor(private servProduct: ProductService) {
    this.products = new Array<IProduct>();
    this.cols = new Array<any>();
    this.table = ViewChild('dt');
    this.current = {code:"", description:"", entityId:"", name:"", price:0, taxPercent:0, _id:"" };
  }

  ngOnInit() {
  }

  async search(event:any) {
    this.products = await this.servProduct.startWith(event.query);
  }

  onSelectProduct(): void {
  }
}
