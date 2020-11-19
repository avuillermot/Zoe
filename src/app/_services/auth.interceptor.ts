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
          'Authorization': "mmm"
        },
        setParams: {
          'entity': ""
        }
    });
    return next.handle(req).pipe(
      tap(evt => { }),
      catchError(
        (err: any) => {
          if ((<HttpErrorResponse>err).status == 401) window.location.href = '/login';
          return of(err);
        }
      )
    );
  }
}
