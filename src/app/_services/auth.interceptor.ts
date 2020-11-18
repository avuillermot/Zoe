import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from './../_services/user/user.service';
import { User } from './../_services/user/user.model';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  public static user: User = new User();
  private static userIsInit: boolean = false;
  constructor() {
    if (AuthInterceptor.userIsInit == false) {
      AuthInterceptor.userIsInit = true;
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (AuthInterceptor.userIsInit != false) {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json',
          'Authorization': AuthInterceptor.user.login
        },
        setParams: {
          'entity': AuthInterceptor.user.entity
        }
      });
    }
    return next.handle(req);
  }
}
