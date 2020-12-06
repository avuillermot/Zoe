import { Component, OnInit } from '@angular/core';
import { ICustomer } from '../_services/customer/customer.model';
import { IDocument, IStatus, IItemLine } from '../_services/calcul-engine/calcul-engine.model';
import * as moment from 'moment';

@Component({
  selector: 'app-purchaseorder-update',
  templateUrl: './purchaseorder-update.component.html',
  styleUrls: ['./purchaseorder-update.component.css']
})
export class PurchaseorderUpdateComponent implements OnInit {

  urlPdf: string = "";
  document: IDocument;
  customers: ICustomer[];
  typeDocument: string = "";
  blocked: boolean = false;
  popupDisplay: boolean = false;
  popupMessage: string = "";

  constructor() {
    this.customers = new Array<ICustomer>();
    this.document = {
      _id: "", items: new Array<IItemLine>(), total: 0, totalFreeTax: 0, taxAmount: 0, statusHistory: new Array<IStatus>(),
      date: moment.utc().toDate(), status: 'INIT',
      number: "",
      customer: {
        address1: "", address2: "", address3: "", city: "", country: "", email: "",
        entityId: "", firstName: "", lastName: "", fullName: "", number: "", phone: "", zipCode: "", _id: ""
      }
    };
  }

  ngOnInit(): void {
  }

  onChangeTab(event: any): void {

  }

  async searchCustomer(event: any) {

  }

  async onSelectCustomer(): Promise<void> {

  }

  async onUnselectCustomer(): Promise<void> {

  }

  async onKeyupCustomer(): Promise<void> {

  }

  sendMail(): void {

  }

  async onLock(): Promise<void> {

  }

  async onSave(): Promise<void> {

  }

}
