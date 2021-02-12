import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Go } from 'app/shared/router/router';
import { InternetConnectionCheckService } from 'app/shared/services/internet-connection-check.service';
import { AppState } from 'app/shared/store/app.model';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { UserActions } from './shared/user/user.actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    internetConnectionAvailable: Observable<boolean>;

    routerSubscription: Subscription;
    notificationOptions = {
        showProgressBar: false,
        pauseOnHover: false,
        clickToClose: true
    };

    constructor(
        readonly router: Router,
        readonly store: Store<AppState>,
        readonly checkConnection: InternetConnectionCheckService
    ) {
        this.internetConnectionAvailable = this.checkConnection.InternetSituation();
    }

    ngOnInit() {
        this.routerSubscription = this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(event => {
                document.getElementsByTagName('main')[0].scrollTop = 0;
            });
    }

    ngOnDestroy() {
        this.routerSubscription.unsubscribe();
    }

    logout() {
        this.store.dispatch(UserActions.Destroy());
        this.store.dispatch(
            new Go({
                path: ['/login']
            })
        );
    }
}
