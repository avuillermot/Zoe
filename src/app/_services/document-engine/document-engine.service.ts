import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentEngineService {

  constructor(private http: HttpClient) { }

  public async getTemplateQuote(): Promise<string> {
    const url: string = environment.services.pdf + "pdf/html/template/quote";
    const html: string = await this.http.get(url, { responseType: 'text' }).toPromise();
    return html;
  }

  public isLocked(status: string) {
    return status == "LOCK" || status == "ACCEPT" || status == "REJECT" || status == "CANCEL";
  }

  public async create(document: any, type: string): Promise<{ _id: string }> {
    const params = new HttpParams();
    const options = { params: params };

    const back: { _id: string } = await this.http.post<{ _id: string }>(environment.services.documentEngine + type, document, options).toPromise();
    return back;
  }

  public async update(document: any, type: string): Promise<any> {
    const params = new HttpParams();
    const options = { params: params };

    const back: any = await this.http.put<any>(environment.services.documentEngine + type, document, options).toPromise();
    return back;
  }

  public async lock(document: any, type: string): Promise<any> {
    const params = new HttpParams();
    const options = { params: params };

    const back: any = await this.http.put<any>(environment.services.documentEngine + type + "/lock", document, options).toPromise();
    return back;
  }

  public async cancel(id: string, type: string): Promise<any> {
    const params = new HttpParams().set("id", id);
    const options = { params: params };

    const back: any = await this.http.put<any>(environment.services.documentEngine + type + "/cancel", document, options).toPromise();
    return back;
  }

  public async accept(id: string, type: string): Promise<any> {
    const params = new HttpParams().set("id", id);
    const options = { params: params };

    const back: any = await this.http.put<any>(environment.services.documentEngine + type + "/accept", document, options).toPromise();
    return back;
  }

  public async reject(id: string, type: string): Promise<any> {
    const params = new HttpParams().set("id", id);
    const options = { params: params };

    const back: any = await this.http.put<any>(environment.services.documentEngine + type + "/reject", document, options).toPromise();
    return back;
  }

  public async get(id: string, type: string): Promise<any> {
    const params = new HttpParams().set("id", id);
    const options = { params: params };

    const back: any[] = await this.http.get<any[]>(environment.services.documentEngine + type, options).toPromise();
    if (back.length > 0) return back[0]
    return <any>{};
  }

  public async getAll(type: string): Promise<any[]> {
    const params = new HttpParams();
    const options = { params: params };

    const back: any[] = await this.http.get<any[]>(environment.services.documentEngine + type, options).toPromise();
    return back;
  }
}
