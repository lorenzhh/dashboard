import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { RouterActions } from '../router/router';
import { AppState } from '../store/app.model';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(readonly router: Router, private store: Store<AppState>) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            return true;
        }

        this.store.dispatch(
            RouterActions.Navigate({
                path: ['login'],
                query: {
                    redirectUrl: state.url
                }
            })
        );

        return false;
    }
}
