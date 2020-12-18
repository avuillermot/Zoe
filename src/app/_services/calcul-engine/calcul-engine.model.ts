import { IProduct } from "../product/product.model";
import { ICustomer } from '../customer/customer.model';
import { IEntity } from '../context';

export interface IItemLine extends IProduct {
  code: string;
  name: string;
  quantity: number;
  total: number;
  totalFreeTax: number;
  taxAmount: number;
  order: number;
}

export interface IDocument {
  _id: string;
  number: string;
  total: number;
  totalFreeTax: number;
  taxAmount: number;
  items: IItemLine[];
  date: Date;
  seller: IEntity;
  customer: ICustomer;
  status: string;
  statusHistory: IStatus[];
  html: string;
  address1: string;
  address2: string;
  address3: string;
  zipCode: string;
  city: string;
  country: string;

}
export interface IQuote extends IDocument {
  expirationDate: Date;
}

export interface IPurchaseOrder extends IDocument {
  paymentDate: Date;
}

export interface IStatus {
  _id: string;
  createdBy: string;
  created: Date;
  updatedBy: string;
  updated: Date;
  status: String;
}
