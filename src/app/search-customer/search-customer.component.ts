import { Component, OnInit } from '@angular/core';
import { Customer } from './../_models/customer';

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.css']
})
export class SearchCustomerComponent implements OnInit {

  customers: Customer[];
  cols: any[];

  constructor() {
    this.customers = new Array<Customer>();
    this.cols = new Array<any>();
  }

  ngOnInit(): void {
    this.customers.push({ firstName: "Leo", lastName: "Rouhana" });
    this.customers.push({ firstName: "Alex", lastName: "Vuillermot" });

    this.cols.push({ field: "firstName", header:"Prenom" });
    this.cols.push({ field: "lastName", header: "Nom" });
  }

}
