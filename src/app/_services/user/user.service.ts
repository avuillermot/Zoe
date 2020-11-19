import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs-compat/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }

  private async getEntity(login: string) {
    let back: any = await this.http.put(environment.services.entity + "entity/byuser", { login: login }).toPromise();
    console.log(back);
  }

  public async logon(login: string, password: string): Promise<void> {
    const params = new HttpParams();
    const options = { params: params };

    this.http.put<Observable<{ login: string, email: string, entity: string }>>(environment.services.user + "logon", { login: login, password: password }, options).toPromise()
      .then((data) => {
        localStorage.setItem('data', JSON.stringify(data));
        localStorage.setItem('token', JSON.stringify(data));
        this.getEntity(login);
        window.location.href = '/';
      })
      .catch(() => {
        localStorage.setItem('data', JSON.stringify({}));
        localStorage.setItem('token', JSON.stringify({}));
        alert("Connexion Impossible");
      });
  }
}
