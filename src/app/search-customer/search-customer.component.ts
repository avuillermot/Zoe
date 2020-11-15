import { Component, OnInit } from '@angular/core';
import { Customer } from './../_models/customer';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.css']
})
export class SearchCustomerComponent implements OnInit {

  customers: Customer[];
  cols: any[];

  constructor(private http: HttpClient) {
    this.customers = new Array<Customer>();
    this.cols = new Array<any>();
  }

  ngOnInit(): void {
    this.getCustomers();

    this.cols.push({ field: "firstName", header:"Prenom" });
    this.cols.push({ field: "lastName", header: "Nom" });
  }

  getCustomers(): void {
    this.http.get('http://localhost:8000/')
      .toPromise()
      .then(res => this.customers = <Customer[]>res)
  }

}
