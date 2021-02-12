import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginAnimation } from 'app/shared/animation/login.animation';
import { NavBarService } from 'app/shared/services/nav-bar.service';
import { AppState } from 'app/shared/store/app.model';
import { UserActions } from 'app/shared/user/user.actions';
import { getCurrentUser, getUserIsLoading } from 'app/shared/user/user.selectors';
import { Login } from 'app/shared/user/login.model';
import { toLower, trim } from 'lodash';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    animations: [loginAnimation],
    host: {
        '[@loginAnimation]': 'true',
        '[style.display]': '"block"',
        '[style.position]': '"absolute"'
    }
})
export class LoginComponent implements OnInit, OnDestroy {
    isLoading: Observable<boolean>;
    returnUrl: string;
    subscribtion: Subscription;

    constructor(
        readonly nav: NavBarService,
        readonly store: Store<AppState>,
        readonly route: ActivatedRoute,
        readonly router: Router
    ) {
        this.isLoading = this.store.select(getUserIsLoading());
    }

    ngOnInit() {
        this.nav.hide();
        this.nav.setActiveView('login');
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.subscribtion = this.store.select(getCurrentUser()).subscribe(responsedata => {
            this.router.navigate([this.returnUrl]);
        });
    }

    submitted(input: Login): void {
        input.username = trim(toLower(input.username));
        this.store.dispatch(UserActions.Authenticate(input));
        this.subscribtion = this.store.select(getCurrentUser()).subscribe(responsedata => {
            this.router.navigate([this.returnUrl]);
        });
    }

    ngOnDestroy(): void {
        this.subscribtion.unsubscribe();
    }
}
