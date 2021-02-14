import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from 'app/shared/user/login.model';
import { User } from 'app/shared/user/user.model';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    resourceName = 'users';
    constructor(readonly httpClient: HttpClient) {}

    login(login: Login): Observable<User> {
        return this.httpClient.get<User>(this.resourceName, this.getRequestOptions(login));
    }

    logout(): Observable<unknown> {
        return of({});
    }

    private getRequestOptions(user: Login) {
        return {
            params: new HttpParams({
                fromObject: {
                    username: user.username,
                    password: user.password
                }
            })
        };
    }
}
