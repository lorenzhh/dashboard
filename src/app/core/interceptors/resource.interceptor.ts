import {
    HttpEvent,
    HttpEventType,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, skipWhile } from 'rxjs/operators';

@Injectable()
export class ResourceInterceptor implements HttpInterceptor {
    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(this.modifyRequest(request)).pipe(
            skipWhile((event: HttpEvent<any>) => event.type === HttpEventType.Sent),
            catchError(response => throwError(response))
        );
    }

    private modifyRequest(request: HttpRequest<any>): HttpRequest<any> {
        return request.clone({
            url: `${environment.backendUrl}/${request.url}`
        });
    }
}
