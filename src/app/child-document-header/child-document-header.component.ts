import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ICustomer } from '../_services/customer/customer.model';
import { IDocument } from '../_services/calcul-engine/calcul-engine.model';
import { CustomerService } from '../_services/customer/customer.service';
import { UserService } from '../_services/user/user.service';
import { IEntity } from '../_services/context';

@Component({
  selector: 'app-child-document-header',
  templateUrl: './child-document-header.component.html',
  styleUrls: ['./child-document-header.component.css']
})
export class ChildDocumentHeaderComponent {

  @Input() typeDocumentLabel: string = "";
  @Input() document: IDocument = <IDocument>{};
  @Output() version = new EventEmitter<number>();

  index: number = 0;
  customers: ICustomer[] = new Array<ICustomer>();
  constructor(private servCustomer: CustomerService, private servUser: UserService) { }

  searchCustomer(event: any) {
    //this.customers = await this.servCustomer.startWith(event.query);
    this.servCustomer.startWith2(event.query).subscribe(
      () => { alert('next'); },
      () => { alert('error'); },
      () => { alert('complete'); }
    );
  }

  async onSelectCustomer(): Promise<void> {
    document.querySelector('#findCustomer')?.classList.remove('ng-invalid');
    if (this.document.status == 'INIT') {

      this.document.address1 = this.document.customer.address1;
      this.document.address2 = this.document.customer.address2;
      this.document.address3 = this.document.customer.address3;
      this.document.zipCode = this.document.customer.zipCode;
      this.document.country = this.document.customer.country;

      let seller: IEntity = await this.servUser.getCurrentEntity();
      if (seller != null) this.document.seller = seller;
    }
    this.version.emit(this.index++);
  }

  async onUnselectCustomer(): Promise<void> {
    document.querySelector('#findCustomer')?.classList.add('ng-invalid');
  }

  async onKeyupCustomer(): Promise<void> {
    if (this.document.customer.number == null || this.document.customer.number == undefined)
      document.querySelector('#findCustomer')?.classList.add('ng-invalid');
  }

}
