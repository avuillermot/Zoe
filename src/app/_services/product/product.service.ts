import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IProduct } from './product.model';
import { User } from '../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public async getAll(entity: string): Promise<IProduct[]> {
    const params = new HttpParams().set('entity', entity);
    let prducts: IProduct[] = await this.http.get<IProduct[]>(environment.services.product + "products", { params }).toPromise();
    return prducts;
  }

  public async get(entity: string, id: string): Promise<IProduct> {
    const params = new HttpParams().set('entity', entity).set("id", id);
    let product: IProduct = await this.http.get<IProduct>(environment.services.product + "product", { params }).toPromise();
    return product;
  }

  public async update(product: IProduct): Promise<IProduct> {
    const params = new HttpParams().set('entity', product.entityId).set("id", product._id);
    return await this.http.put<IProduct>(environment.services.product + "product", product, { params }).toPromise();
  }

  public async create(product: IProduct, user: User): Promise<IProduct> {
    const params = new HttpParams().set('entity', user.entity);
    product.entityId = user.entity;
    return await this.http.post<IProduct>(environment.services.customer + "product", product, { params }).toPromise();
  }
}
