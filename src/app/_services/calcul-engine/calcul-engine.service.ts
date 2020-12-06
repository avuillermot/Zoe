import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IItemLine, IQuote, IDocument } from "./calcul-engine.model";
import { isQuote } from '@angular/compiler';

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
  public async createQuote(document: IQuote): Promise<{id: string}> {
    const params = new HttpParams();
    const options = { params: params };

    const back: { id: string } = await this.http.post<{ id: string }>(environment.services.calculEngine + "quote", document, options).toPromise();
    return back;
  }

  public async updateQuote(document: IQuote): Promise<IQuote> {
    const params = new HttpParams();
    const options = { params: params };

    const back: IQuote = await this.http.put<IQuote>(environment.services.calculEngine + "quote", document, options).toPromise();
    return back;
  }

  public async lockQuote(document: IQuote): Promise<IQuote> {
    const params = new HttpParams();
    const options = { params: params };

    const back: IQuote = await this.http.put<IQuote>(environment.services.calculEngine + "quote/lock", document, options).toPromise();
    return back;
  }

  public async getQuote(id: string): Promise<IQuote> {
    const params = new HttpParams().set("id", id);
    const options = { params: params };

    const back: IQuote[] = await this.http.get<IQuote[]>(environment.services.calculEngine + "quote", options).toPromise();
    if (back.length > 0) return back[0]
    return <IQuote>{};
  }

  public async getQuotes(): Promise<IQuote[]> {
    const params = new HttpParams();
    const options = { params: params };

    const back: IQuote[] = await this.http.get<IQuote[]>(environment.services.calculEngine + "quotes", options).toPromise();
    return back;
  }
}
