import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InternetConnectionCheckService } from 'app/shared/services/internet-connection-check.service';
import { NotificationType } from 'app/shared/ui/notification/notification-type';
import { NotificationService } from 'app/shared/ui/notification/notification.service';
import { User } from 'app/shared/user/user.model';
import { Login } from 'app/shared/user/login.model';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    resourceName = 'users';
    internetConnectionAvailable: boolean;
    constructor(
        readonly httpClient: HttpClient,
        readonly notificationService: NotificationService,
        readonly checkConnection: InternetConnectionCheckService
    ) {
        this.checkConnection
            .InternetSituation()
            .subscribe((status: boolean) => (this.internetConnectionAvailable = status));
    }

    login(login: Login) {
        return this.httpClient
            .get<User[]>(this.getUrl(this.resourceName), this.getRequestOptions(login))
            .pipe(
                map((list: User[]) => list[0]),
                map((activeUser: User) => {
                    if (activeUser) {
                        window.localStorage.setItem('currentUser', JSON.stringify(activeUser));
                        return activeUser;
                    } else {
                        throw new Error('Ungültige Anmeldedaten!');
                    }
                }),
                catchError((error: Error) => {
                    if (!this.internetConnectionAvailable) {
                        return this.handleResponse('No Internet Connection!', NotificationType.warn);
                    }
                    if (error instanceof HttpErrorResponse) {
                        return this.handleResponse(error.statusText, NotificationType.error);
                    }
                    return this.handleResponse(error.message, NotificationType.error);
                })
            );
    }

    logout() {
        return new Observable(observer => {
            window.localStorage.removeItem('currentUser');
            return observer.next({});
        });
    }

    private getRequestOptions(user: Login) {
        return {
            params: new HttpParams({
                fromObject: {
                    username: user.username,
                    password: user.password
                }
            }),
            headers: this.getHeaders()
        };
    }

    private getHeaders() {
        return new HttpHeaders().set('Content-Type', 'application/json');
    }

    private getUrl(resourceName: string): string {
        return environment.backendUrl + resourceName;
    }

    private handleResponse(response: string, type: NotificationType) {
        this.notificationService.showNotification(type, response);
        return throwError(response);
    }
}
