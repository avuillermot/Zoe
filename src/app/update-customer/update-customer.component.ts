import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { CustomerService } from '../_services/customer/customer.service';
import { UserService } from '../_services/user/user.service';
import { ICustomer } from '../_services/customer/customer.model';
import { NgForm, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {

  customer: ICustomer;
  errors: { type: string, field: string }[];
  updateOrAddMode: string = "";
  blocked: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private servCustomer: CustomerService) {
    this.customer = <ICustomer>{};
    this.errors = new Array<{ type: string, field: string }>();
  }

  async ngOnInit(): Promise<void> {
    let id: string | null = this.route.snapshot.paramMap.get("id");
    this.updateOrAddMode = ((id == null || id == undefined) ? "ADD" : "UPDATE");
    if (id != null) this.customer = await this.servCustomer.get(id)
  }

  async onSave(customerForm: NgForm) {
    let self = this;
    self.errors = new Array<{type: string, field: string }>();
    if (customerForm.form.status == "VALID") {
      if (this.updateOrAddMode == "UPDATE") await this.servCustomer.update(this.customer);
      else {
        this.blocked = true;
        let back:ICustomer = <ICustomer> await this.servCustomer.create(this.customer);
        this.router.navigate(['customer/update/' + back._id]);
      }
    }
    else {
      let _errors: { [key: string]: AbstractControl } = customerForm.form.controls;
      Object.keys(_errors).forEach(function (value) {
        var current = _errors[value];
        if (current.status == "INVALID" && current.errors != null) {
          Object.keys(current.errors).forEach(function (error) {
            self.errors.push({ type: error, field: value });
          });
        }
      });
    }
  }
}
