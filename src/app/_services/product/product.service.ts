import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IProduct } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public async getAll(entity: string): Promise<IProduct[]> {
    const params = new HttpParams().set('entity', entity);
    let customers: IProduct[] = await this.http.get<IProduct[]>(environment.services.product + "products", { params }).toPromise();
    return customers;
  }

  public async get(entity: string, id: string): Promise<IProduct> {
    const params = new HttpParams().set('entity', entity).set("id", id);
    let customer: IProduct = await this.http.get<IProduct>(environment.services.product + "product", { params }).toPromise();
    return customer;
  }

  public async update(product: IProduct): Promise<void> {
    const params = new HttpParams().set('entity', product.entityId).set("id", product._id);
    await this.http.put<IProduct>(environment.services.product + "product", product, { params }).toPromise();
  }
}
