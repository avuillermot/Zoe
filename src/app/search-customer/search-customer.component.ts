import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { ICustomer } from '../_services/customer/customer.model';
import { CustomerService } from '../_services/customer/customer.service';
import { UserService } from '../_services/user/user.service';

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.css']
})
export class SearchCustomerComponent implements OnInit {

  customers: ICustomer[];
  cols: any[];
  @ViewChild('dt') table: Table;

  constructor(private router: Router, private servCustomer: CustomerService, private servUser: UserService) {
    this.customers = new Array<ICustomer>();
    this.cols = new Array<any>();
    this.table = ViewChild('dt');
  }

  async ngOnInit(): Promise<void> {
    this.customers = await this.servCustomer.getAll();

    this.cols.push({ field: "number", header: "Numéro" });
    this.cols.push({ field: "firstName", header:"Prenom" });
    this.cols.push({ field: "lastName", header: "Nom" });
    this.cols.push({ field: "email", header: "Email" });
    this.cols.push({ field: "phone", header: "Telephone" });
    this.cols.push({ field: "city", header: "Ville" });
  }


  filter($event:any, field:string, pattern:string): void {
    this.table.filter($event.target.value, field, pattern);
  }

  onClick(data:string): void {
    this.router.navigate(['customer/update/'+ data]);
  }

}
