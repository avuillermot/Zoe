import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IDocument } from "./calcul-engine.model";

@Injectable({
  providedIn: 'root'
})
export class CalculEngineService {

  constructor(private http: HttpClient) { }

  public async send(document: IDocument): Promise<IDocument> {
    const params = new HttpParams();
    const options = { params: params };

    const back: IDocument = await this.http.put<IDocument>(environment.services.calculEngine + "document/calcul", document, options).toPromise();
    return back;
  }

/**
* Create a new quote
* @document data of the new document
* @returns id of the new document
*/
  public async create(document: any, type:string): Promise<{_id: string}> {
    const params = new HttpParams();
    const options = { params: params };

    const back: { _id: string } = await this.http.post<{ _id: string }>(environment.services.calculEngine + type, document, options).toPromise();
    return back;
  }

  public async update(document: any, type: string): Promise<any> {
    const params = new HttpParams();
    const options = { params: params };

    const back: any = await this.http.put<any>(environment.services.calculEngine + type, document, options).toPromise();
    return back;
  }

  public async lock(document: any, type: string): Promise<any> {
    const params = new HttpParams();
    const options = { params: params };

    const back: any = await this.http.put<any>(environment.services.calculEngine +  type + "/lock", document, options).toPromise();
    return back;
  }

  public async get(id: string, type: string): Promise<any> {
    const params = new HttpParams().set("id", id);
    const options = { params: params };

    const back: any[] = await this.http.get<any[]>(environment.services.calculEngine + type, options).toPromise();
    if (back.length > 0) return back[0]
    return <any>{};
  }

  public async getAll(type: string): Promise<any[]> {
    const params = new HttpParams();
    const options = { params: params };

    const back: any[] = await this.http.get<any[]>(environment.services.calculEngine + type, options).toPromise();
    return back;
  }
}
