import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { InternetConnectionCheckService } from 'app/shared/services/internet-connection-check.service';
import { AppState } from 'app/shared/store/app.model';
import { Observable, Subscription } from 'rxjs';
import { UserActions } from './shared/user/user.actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    internetConnectionAvailable$: Observable<boolean>;

    routerSubscription: Subscription;
    notificationOptions = {
        showProgressBar: false,
        pauseOnHover: false,
        clickToClose: true
    };

    constructor(
        private store: Store<AppState>,
        private checkConnection: InternetConnectionCheckService
    ) {
        this.internetConnectionAvailable$ = this.checkConnection.InternetSituation();
    }

    logout(): void {
        this.store.dispatch(UserActions.Destroy());
    }
}
