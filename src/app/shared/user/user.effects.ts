import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { UserActions } from 'app/shared/user/user.actions';
import { User } from 'app/shared/user/user.model';
import { UserService } from 'app/shared/user/user.service';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap, switchMap, tap } from 'rxjs/operators';
import { RouterActions } from '../router/router';

@Injectable()
export class UserEffects {
    LoadUser$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.Authenticate),
            switchMap(payload =>
                this.userService.login(payload.login).pipe(
                    tap(user => localStorage.setItem('currentUser', JSON.stringify(user))),
                    mergeMap((user: User) => [
                        UserActions.Authenticated(user),
                        RouterActions.GO({ path: [payload.redirectUrl] })
                    ]),
                    catchError(() => of(UserActions.AuthenticateError(null)))
                )
            )
        )
    );

    DestroyUser$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.Destroy),
            switchMap(() =>
                this.userService.logout().pipe(
                    tap(() => localStorage.removeItem('currentUser')),
                    mergeMap((user: User) => [
                        UserActions.Destroyed(user),
                        RouterActions.GO({ path: ['login'] }),
                    ]),
                    catchError(() => of(UserActions.DestroyError(null)))
                )
            )
        )
    );

    constructor(readonly actions$: Actions, readonly userService: UserService) {}
}
