import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CustomerService } from '../_services/customer/customer.service';
import { ICustomer } from '../_services/customer/customer.model';
import { NgForm, AbstractControl } from '@angular/forms';
import { newArray } from '@angular/compiler/src/util';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {

  customer: ICustomer;

  constructor(private route: ActivatedRoute, private servCustomer: CustomerService) {
    this.customer = <ICustomer>{};
  }

  async ngOnInit(): Promise<void> {
    let id: string | null = this.route.snapshot.paramMap.get("id");
    if (id != null) this.customer = await this.servCustomer.getCustomer("ENTTEST", id)
  }

  async onSave(customerForm: NgForm) {
    console.log(customerForm);
    if (customerForm.form.status == "VALID") {
      await this.servCustomer.update(this.customer);
    }
    else {
      var results: { type: string, field: string }[] = new Array <{ type: string, field: string }>();
      let errors: { [key: string]: AbstractControl } = customerForm.form.controls;
      Object.keys(errors).forEach(function (value) {
        var current = errors[value];
        if (current.status == "INVALID") {

          Object.keys(current.errors).forEach(function (error) {
            //results.push({ type: current.errors, field: value });
          });

        }
      });
    }
  }
}
