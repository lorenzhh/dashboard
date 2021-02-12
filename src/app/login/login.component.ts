import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { loginAnimation } from 'app/shared/animation/login.animation';
import { NavBarService } from 'app/shared/services/nav-bar.service';
import { AppState } from 'app/shared/store/app.model';
import { Login } from 'app/shared/user/login.model';
import { UserActions } from 'app/shared/user/user.actions';
import { isLoading } from 'app/shared/user/user.selectors';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [loginAnimation],
    host: {
        '[@loginAnimation]': 'true',
        '[style.display]': '"block"',
        '[style.position]': '"absolute"'
    }
})
export class LoginComponent implements OnInit {
    isLoading$: Observable<boolean>;
    private redirectUrl: string;
    constructor(
        readonly nav: NavBarService,
        readonly store: Store<AppState>,
        readonly route: ActivatedRoute,
        readonly router: Router
    ) {
        this.isLoading$ = this.store.pipe(select(isLoading));
    }

    ngOnInit() {
        this.nav.hide();
        this.nav.setActiveView('login');
        this.redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '';
    }

    submitted(input: Login): void {
        input.username = input.username.toLowerCase().trim();
        this.store.dispatch(UserActions.Authenticate({ login: input, redirectUrl: this.redirectUrl }));
    }
}
