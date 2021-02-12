import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { loginAnimation } from 'app/shared/animation/login.animation';
import { NavBarService } from 'app/shared/services/nav-bar.service';
import { AppState } from 'app/shared/store/app.model';
import { UserActions } from 'app/shared/user/user.actions';
import { currentUser, isLoading } from 'app/shared/user/user.selectors';
import { Login } from 'app/shared/user/login.model';
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
        this.isLoading = this.store.pipe(select(isLoading));
    }

    ngOnInit() {
        this.nav.hide();
        this.nav.setActiveView('login');
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.subscribtion = this.store.pipe(select(currentUser)).subscribe(() => {
            this.router.navigate([this.returnUrl]);
        });
    }

    submitted(input: Login): void {
        input.username = input.username.toLowerCase().trim();
        this.store.dispatch(UserActions.Authenticate(input));
        this.subscribtion = this.store.pipe(select(currentUser)).subscribe(() => {
            this.router.navigate([this.returnUrl]);
        });
    }

    ngOnDestroy(): void {
        this.subscribtion.unsubscribe();
    }
}
