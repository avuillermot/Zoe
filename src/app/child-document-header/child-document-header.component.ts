import { Component, Input } from '@angular/core';
import { ICustomer } from '../_services/customer/customer.model';
import { IDocument } from '../_services/calcul-engine/calcul-engine.model';
import { CustomerService } from '../_services/customer/customer.service';

@Component({
  selector: 'app-child-document-header',
  templateUrl: './child-document-header.component.html',
  styleUrls: ['./child-document-header.component.css']
})
export class ChildDocumentHeaderComponent {

  @Input() typeDocumentLabel: string = "";
  @Input() document: IDocument = <IDocument>{};
  customers: ICustomer[] = new Array<ICustomer>();
  constructor(private servCustomer: CustomerService) { }

  async searchCustomer(event: any) {
    this.customers = await this.servCustomer.startWith(event.query);
  }

  async onSelectCustomer(): Promise<void> {
    document.querySelector('#findCustomer')?.classList.remove('ng-invalid');
  }

  async onUnselectCustomer(): Promise<void> {
    document.querySelector('#findCustomer')?.classList.add('ng-invalid');
  }

  async onKeyupCustomer(): Promise<void> {
    if (this.document.customer.number == null || this.document.customer.number == undefined)
      document.querySelector('#findCustomer')?.classList.add('ng-invalid');
  }

}
