import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { IProduct } from '../_services/product/product.model';
import { ProductService } from '../_services/product/product.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {

  products: IProduct[];
  cols: any[];
  @ViewChild('dt') table: Table;

  constructor(private router: Router, private servProduct: ProductService) {
    this.products = new Array<IProduct>();
    this.cols = new Array<any>();
    this.table = ViewChild('dt');
  }

  async ngOnInit(): Promise<void> {
    this.products = await this.servProduct.getAll();

    this.cols.push({ field: "code", header: "Code" });
    this.cols.push({ field: "name", header: "Nom" });
    this.cols.push({ field: "price", header: "Prix unitaire HT" });
    this.cols.push({ field: "taxPercent", header: "Taxe (%)" });
  }


  filter($event: any, field: string, pattern: string): void {
    this.table.filter($event.target.value, field, pattern);
  }

  onClick(data: string): void {
    this.router.navigate(['product/update/' + data]);
  }

}
