import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { catchError, Observable, EMPTY, throwError } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
      private readonly router: Router) {

  }

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(catchError(err => {
        if (err instanceof HttpErrorResponse && [504].includes(err.status)) {
          this.router.navigate(['/errors/500']);
          return EMPTY;
        } else {
          return throwError(() => err);
        }
      }));
  }
}
