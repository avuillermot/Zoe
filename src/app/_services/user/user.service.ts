import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthInterceptor } from '../auth.interceptor';
import { IContext} from '../context'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }

  private async getAllowEntity(token: string) {
    // set token with empty entity
    AuthInterceptor.setTokenContext(token);
    let back: any = await this.http.put(environment.services.entity + "entity/byuser", { }).toPromise()
      .then((newToken: any) => {
        // set token with entity
        AuthInterceptor.setTokenContext(newToken.token);
        window.location.href = '/';
      })
      .catch((err) => { alert("Accès refusé !"); });
  }

  public async logon(login: string, password: string): Promise<void> {
    const params = new HttpParams();
    const options = { params: params };

    this.http.put<{token: string}>(environment.services.user + "logon", { login: login, password: password }, options).toPromise()
      .then((context) => {
        this.getAllowEntity(context.token);
      })
      .catch((err) => {
        AuthInterceptor.logout();
        alert("Identifiant non valide");
      });
  }

  public async getContext(): Promise<IContext> {
    return await this.http.get<IContext>(environment.services.context + "context").toPromise();
  }

  public static setReturnUrl(url: string): void {
    localStorage.setItem('returnUrl', url);
  }

  public static getReturnUrl(): string {
    let back: string | null = localStorage.getItem('returnUrl');
    if (back == null) return "";
    else return back;
  }
}
