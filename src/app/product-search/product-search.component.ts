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
    this.products = []; //await this.servProduct.get("ENTTEST");

    this.cols.push({ field: "firstName", header: "Prenom" });
    this.cols.push({ field: "lastName", header: "Nom" });
    this.cols.push({ field: "email", header: "Email" });
    this.cols.push({ field: "phone", header: "Telephone" });
    this.cols.push({ field: "city", header: "Ville" });
  }


  filter($event: any, field: string, pattern: string): void {
    this.table.filter($event.target.value, field, pattern);
  }

  onClick(data: string): void {
    this.router.navigate(['product/update/' + data]);
  }

}
