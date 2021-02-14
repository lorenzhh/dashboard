import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { UserActions } from 'app/shared/user/user.actions';
import { User } from 'app/shared/user/user.model';
import { UserService } from 'app/shared/user/user.service';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class UserEffects {
    LoadUser$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.Authenticate),
            switchMap(payload =>
                this.userService.login(payload.login).pipe(
                    map((user: User) => UserActions.Authenticated(user)),
                    tap(user => localStorage.setItem('currentUser', JSON.stringify(user))),
                    tap(() => this.router.navigate([payload.redirectUrl])),
                    catchError(error => of(UserActions.AuthenticateError(error)))
                )
            )
        )
    );

    DestroyUser$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.Destroy),
            switchMap(() =>
                from(this.router.navigate(['login'])).pipe(
                    map(navigated => {
                        if (navigated) {
                            return UserActions.Destroyed(null);
                        }
                        return UserActions.DestroyError(null);
                    }),
                    ofType(UserActions.Destroyed),
                    tap(() => localStorage.removeItem('currentUser'))
                )
            )
        )
    );

    constructor(readonly actions$: Actions, readonly userService: UserService, private router: Router) {}
}
