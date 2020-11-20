import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IProduct } from './product.model';
import { AuthInterceptor } from '../auth.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public async getAll(): Promise<IProduct[]> {
    let prducts: IProduct[] = await this.http.get<IProduct[]>(environment.services.product + "products").toPromise();
    return prducts;
  }

  public async get(id: string): Promise<IProduct> {
    const params = new HttpParams().set("id", id);
    let product: IProduct = await this.http.get<IProduct>(environment.services.product + "product", { params }).toPromise();
    return product;
  }

  public async update(product: IProduct): Promise<IProduct> {
    const params = new HttpParams().set("id", product._id);
    const options = { params: params };

    return await this.http.put<IProduct>(environment.services.product + "product", product, options).toPromise();
  }

  public async create(product: IProduct): Promise<IProduct> {
    const params = new HttpParams().set('entity', AuthInterceptor.getEntity());
    const options = { params: params };

    product.entityId = AuthInterceptor.getEntity();
    return await this.http.post<IProduct>(environment.services.customer + "product", product, options).toPromise();
  }
}
