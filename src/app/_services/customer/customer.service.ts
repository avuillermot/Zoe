import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ICustomer } from './customer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  public async getAll(): Promise<ICustomer[]> {
    let customers: ICustomer[] = await this.http.get<ICustomer[]>(environment.services.customer + "customers").toPromise();
    return customers;
  }

  public async get(id: string): Promise<ICustomer> {
    const params = new HttpParams().set("id", id);

    let customer: ICustomer = await this.http.get<ICustomer>(environment.services.customer + "customer", { params }).toPromise();
    return customer;
  }

  public async startWith(startWith: string): Promise<ICustomer[]> {
    const params = new HttpParams().set("startwith", startWith);
    let customers: ICustomer[] = await this.http.get<ICustomer[]>(environment.services.product + "customer/startwith", { params }).toPromise();
    return customers;
  }

  public startWith2(startWith: string): Observable<ICustomer[]> {
    const params = new HttpParams().set("startwith", startWith);
    return this.http.get<ICustomer[]>(environment.services.product + "customer/startwith", { params });
  }

  public async update(customer: ICustomer): Promise<void> {
    const params = new HttpParams().set("id", customer._id);
    const options = { params: params };
    
    await this.http.put<ICustomer>(environment.services.customer + "customer", customer, options).toPromise();
  }

  public async create(customer: ICustomer): Promise<ICustomer> {
    return await this.http.post<ICustomer>(environment.services.customer + "customer", customer).toPromise();
  }
}
