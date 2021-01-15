import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IEntity } from '../context';


@Injectable({
  providedIn: 'root'
})
export class EntityCreateService {

  constructor(private http: HttpClient) { }

  public create(
    entity: { name: string, address1: string, address2: string, address3: string, zipCode: string, city: string, country: string, email: string },
    owner: { email: string, firstName: string, lastName: string } ): void {

    const params = new HttpParams();
    const options = { params: params };

    this.http.post<void>(environment.services.entity + "entity", { entity: entity, owner: owner }, options).toPromise();
  }

}
