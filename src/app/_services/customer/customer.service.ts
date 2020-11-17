import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ICustomer } from './customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  public async getAll(entity: string): Promise<ICustomer[]> {
    const params = new HttpParams().set('entity', entity);
    let customers: ICustomer[] = await this.http.get<ICustomer[]>(environment.services.customer + "customers", { params }).toPromise();
    return customers;
  }

  public async get(entity: string, id: string): Promise<ICustomer> {
    const params = new HttpParams().set('entity', entity).set("id",id);
    let customer: ICustomer = await this.http.get<ICustomer>(environment.services.customer + "customer", { params }).toPromise();
    return customer;
  }

  public async update(customer: ICustomer): Promise<void> {
    const params = new HttpParams().set('entity', customer.entityId).set("id", customer._id);
    await this.http.put<ICustomer>(environment.services.customer + "customer", customer, { params }).toPromise();
  }
}
