import { IProduct } from "../product/product.model";
import { ICustomer } from '../customer/customer.model';
import * as moment from 'moment';

export interface IItemLine extends IProduct {
  code: string;
  name: string;
  quantity: number;
  total: number;
  totalFreeTax: number;
  taxAmount: number;
  order: number;
}

export interface IQuote {
  _id: string;
  number: string;
  total: number;
  totalFreeTax: number;
  taxAmount: number;
  items: IItemLine[];
  date: Date;
  expirationDate: Date;
  customer: ICustomer;
  status: string;
  statusHistory: IStatus[];
}

export interface IStatus {
  _id: string;
  createdBy: string;
  created: Date;
  status: String;
}

export class DocumentHelper {
  public static formatDateUI(date: Date): string {
    return moment(date).format("DD/MM/yy");
  }
}
