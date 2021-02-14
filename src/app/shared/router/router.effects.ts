import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { RouterActions } from './router';
@Injectable()
export class RouterEffects {
    navigate$ = createEffect(() =>
        this.actions$.pipe(ofType(RouterActions.Navigate)).pipe(
            switchMap(payload =>
                from(
                    this.router.navigate(payload.path, {
                        queryParams: payload.query,
                        ...payload.extras
                    })
                ).pipe(
                    map(navigated =>
                        navigated ? RouterActions.NavigateSuccess() : RouterActions.NavigateError()
                    )
                )
            )
        )
    );

    navigateBack$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(RouterActions.Back),
                tap(() => this.location.back())
            ),
        { dispatch: false }
    );

    navigateForward$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(RouterActions.Forward),
                tap(() => this.location.forward())
            ),
        { dispatch: false }
    );

    constructor(readonly actions$: Actions, readonly router: Router, readonly location: Location) {}
}
