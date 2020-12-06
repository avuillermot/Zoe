import { Component, Input } from '@angular/core';
import { ICustomer } from '../_services/customer/customer.model';

@Component({
  selector: 'app-child-tabpanel-address',
  templateUrl: './child-tabpanel-address.component.html',
  styleUrls: ['./child-tabpanel-address.component.css']
})
export class ChildTabpanelAddressComponent {
  @Input() customer: ICustomer = <ICustomer>{};

  constructor() { }
}
