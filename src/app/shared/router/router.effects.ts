import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { RouterActions } from './router';
@Injectable()
export class RouterEffects {
    navigate$ = createEffect(
        () =>
            this.actions$.pipe(ofType(RouterActions.GO)).pipe(
                tap(payload => {
                    this.router.navigate(payload.path, {
                        queryParams: payload.query,
                        ...payload.extras
                    });
                })
            ),
        { dispatch: false }
    );

    navigateBack$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(RouterActions.BACK),
                tap(() => this.location.back())
            ),
        { dispatch: false }
    );

    navigateForward$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(RouterActions.FORWARD),

                tap(() => this.location.forward())
            ),
        { dispatch: false }
    );

    constructor(readonly actions$: Actions, readonly router: Router, readonly location: Location) {}
}
