import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { retry } from 'rxjs/operators';
import { map, filter, tap, catchError } from 'rxjs/operators';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json',
        'Authorization': 'Bearer '+AuthInterceptor.getToken()
        }
    });
    return next.handle(req).pipe(
      tap(evt => { }),
      catchError(
        (err: any) => {
          if ((<HttpErrorResponse>err).status == 401 && window.location.pathname != '/login') window.location.href = '/login';
          throw err;
        }
      )
    );
  }

  public static setTokenContext(token: any): void {
    localStorage.setItem('zoetoken', token);
  }

  public static logout() {
    localStorage.setItem('zoetoken', "");
  }

  public static getToken() : string {
    let data: string | null = localStorage.getItem("zoetoken");
    if (data == null || data == undefined || data == "") return "";
    return data;
  }
}
