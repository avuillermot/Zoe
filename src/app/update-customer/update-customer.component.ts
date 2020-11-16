import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CustomerService } from '../_services/customer/customer.service';
import { ICustomer } from '../_services/customer/customer.model';

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

  async onSave() {
    await this.servCustomer.update(this.customer);
  }
}
