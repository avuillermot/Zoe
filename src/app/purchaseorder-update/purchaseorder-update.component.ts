import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationService } from 'primeng/api';
import { ICustomer } from '../_services/customer/customer.model';
import { CalculEngineService } from '../_services/calcul-engine/calcul-engine.service';
import { IPurchaseOrder, IItemLine, IStatus } from '../_services/calcul-engine/calcul-engine.model';
import { CustomerService } from '../_services/customer/customer.service';
import * as moment from 'moment';

@Component({
  selector: 'app-purchaseorder-update',
  templateUrl: './purchaseorder-update.component.html',
  styleUrls: ['./purchaseorder-update.component.css'],
  providers: [ConfirmationService]
})
export class PurchaseorderUpdateComponent implements OnInit {

  urlPdf: string = "";
  document: IPurchaseOrder;
  typeDocument: string = "";
  blocked: boolean = false;
  popupDisplay: boolean = false;
  popupMessage: string = "";

  constructor(private servCustomer: CustomerService, private servCalcul: CalculEngineService,
    private route: ActivatedRoute, private router: Router, private confirmationService: ConfirmationService) {

    this.document = {
      _id: "", items: new Array<IItemLine>(), total: 0, totalFreeTax: 0, taxAmount: 0, statusHistory: new Array<IStatus>(),
      date: moment.utc().toDate(), paymentDate: moment.utc().toDate(), status: 'INIT', html: "",
      number: "",
      customer: {
        address1: "", address2: "", address3: "", city: "", country: "", email: "",
        entityId: "", firstName: "", lastName: "", fullName: "", number: "", phone: "", zipCode: "", _id: ""
      }
    };
  }

  async ngOnInit(): Promise<void> {
    let cid: string | null = this.route.snapshot.paramMap.get("customer");
    if (cid != null) {
      this.document.customer = await this.servCustomer.get(cid);
    }

    let id: string | null = this.route.snapshot.paramMap.get("id");
    if (id != null) {
      this.document = await this.servCalcul.get(id, 'purchaseorder');
      // force date to date object to be set in calendar
      this.document.date = new Date(this.document.date);
      //this.document.expirationDate = new Date(this.document.expirationDate);
    }
  }

  sendMail(): void {

  }
  

}
