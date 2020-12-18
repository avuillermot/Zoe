import { Injectable, SecurityContext } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl, SafeHtml } from '@angular/platform-browser';
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
}
