import {
    HttpErrorResponse,
    HttpEvent,
    HttpEventType,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, skipWhile } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor() {}

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        return next.handle(request).pipe(
            skipWhile((event: HttpEvent<any>) => event.type === HttpEventType.Sent),
            catchError((response: HttpErrorResponse) => {
                return throwError(response);
            })
        );
    }
}
