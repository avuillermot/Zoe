import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IItemLine, IDocument } from "./calcul-engine.model";

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
}
