import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs-compat/Observable';
import { AuthInterceptor } from '../auth.interceptor';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }

  private async getAllowEntity(context: { login: string, email: string, entity: string }) {
    let back: any = await this.http.put(environment.services.entity + "entity/byuser", { login: context.login }).toPromise()
      .then((entities: any) => {
        context.entity = entities[0]._id;
        AuthInterceptor.setDataContext(context, JSON.stringify(context));
        window.location.href = '/';
      })
      .catch(() => { alert("Accès refusé !"); });
    console.log(back);
  }

  public async logon(login: string, password: string): Promise<void> {
    const params = new HttpParams();
    const options = { params: params };

    this.http.put<{ login: string, email: string, entity: string }>(environment.services.user + "logon", { login: login, password: password }, options).toPromise()
      .then((context) => {
        this.getAllowEntity(context);
      })
      .catch((err) => {
        AuthInterceptor.logout();
        alert("Identifiant non valide");
      });
  }
}
