import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { BACK, FORWARD, Go, GO } from './router';
@Injectable()
export class RouterEffects {
    navigate$ = createEffect(
        () =>
            this.actions$.pipe(ofType(GO)).pipe(
                map((action: Go) => action.payload),
                tap(({ path, query: queryParams, extras }) => {
                    this.router.navigate(path, {
                        queryParams,
                        ...extras
                    });
                })
            ),
        { dispatch: false }
    );

    navigateBack$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(BACK),
                tap(() => this.location.back())
            ),
        { dispatch: false }
    );

    navigateForward$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(FORWARD),

                tap(() => this.location.forward())
            ),
        { dispatch: false }
    );

    constructor(
        readonly actions$: Actions,
        readonly router: Router,
        readonly location: Location
    ) {}
}
