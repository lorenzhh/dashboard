import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from 'app/shared/user/login.model';
import { User } from 'app/shared/user/user.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    resourceName = 'users';
    constructor(readonly httpClient: HttpClient) {}

    login(login: Login) {
        return this.httpClient.get<User[]>(this.resourceName, this.getRequestOptions(login)).pipe(
            map((list: User[]) => list[0]),
            map((activeUser: User) => {
                if (activeUser) {
                    return activeUser;
                } else {
                    throw new Error('Ungültige Anmeldedaten!');
                }
            })
        );
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
