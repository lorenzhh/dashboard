import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { UserActions } from 'app/shared/user/user.actions';
import { User } from 'app/shared/user/user.model';
import { UserService } from 'app/shared/user/user.service';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()
export class UserEffects {
    LoadUser$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.Authenticate),
            switchMap(userLogin =>
                this.userService.login(userLogin).pipe(
                    map((user: User) => UserActions.Authenticated(user)),
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
                    map((destroyUser: any) => UserActions.Destroyed(destroyUser)),
                    catchError(() => of(UserActions.DestroyError(null)))
                )
            )
        )
    );

    constructor(readonly actions$: Actions, readonly userService: UserService) {}
}
