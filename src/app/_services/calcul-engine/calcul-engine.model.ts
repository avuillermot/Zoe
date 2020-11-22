import { IProduct } from "../product/product.model";
import { ICustomer } from '../customer/customer.model';

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
  total: number;
  totalFreeTax: number;
  taxAmount: number;
  items: IItemLine[];
  date: Date;
  expirationDate: Date;
  customer: ICustomer;
}
