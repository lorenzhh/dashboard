import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Catalogue } from 'app/shared/catalogues/catalogue.model';
import { CatalougeActions } from 'app/shared/catalogues/catalogues.actions';
import {
    cataloguesOfNextTwoYear,
    cataloguesOfNextYear,
    cataloguesOfThisYear,
    getMonthOfYear,
    getThisYear
} from 'app/shared/catalogues/catalogues.selectors';
import { ChartData } from 'app/shared/chart/chart-data.model';
import { NavBarService } from 'app/shared/services/nav-bar.service';
import { AppState } from 'app/shared/store/app.model';
import { User } from 'app/shared/user/user.model';
import { currentUser } from 'app/shared/user/user.selectors';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit, OnDestroy {
    year = getThisYear();

    currentUser: User;
    activeUserSubscribtion: Subscription;

    cataloguesOfThisYear: Observable<Catalogue[]>;
    cataloguesOfNextYear: Observable<Catalogue[]>;
    cataloguesOfNextNextYear: Observable<Catalogue[]>;

    chartDataOfThisYear: ChartData;
    chartDataOfNextYear: ChartData;
    chartDataOfNextNextYear: ChartData;

    cataloguesOfThisYearSubscription: Subscription;
    cataloguesOfNextYearSubscription: Subscription;
    cataloguesOfNextNextYearSubscription: Subscription;

    barChartType = 'bar';
    barLabels: string[] = [
        'Jan',
        'Feb',
        'Mär',
        'Apr',
        'Mai',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Okt',
        'Nov',
        'Dez'
    ];

    constructor(readonly nav: NavBarService, readonly store: Store<AppState>) {
        this.activeUserSubscribtion = this.store
            .select(currentUser)
            .subscribe(activeUser => (this.currentUser = activeUser));

        this.cataloguesOfThisYear = this.store.pipe(select(cataloguesOfThisYear));
        this.cataloguesOfThisYearSubscription = this.cataloguesOfThisYear.subscribe(
            catalogues =>
                (this.chartDataOfThisYear = [
                    {
                        data: getMonthOfYear(catalogues)
                    }
                ])
        );
        this.cataloguesOfNextYear = this.store.pipe(select(cataloguesOfNextYear));
        this.cataloguesOfNextYearSubscription = this.cataloguesOfNextYear.subscribe(
            catalogues =>
                (this.chartDataOfNextYear = [
                    {
                        data: getMonthOfYear(catalogues)
                    }
                ])
        );
        this.cataloguesOfNextNextYear = this.store.pipe(select(cataloguesOfNextTwoYear));
        this.cataloguesOfNextNextYearSubscription = this.cataloguesOfNextNextYear.subscribe(
            catalogues =>
                (this.chartDataOfNextNextYear = [
                    {
                        data: getMonthOfYear(catalogues)
                    }
                ])
        );
    }

    ngOnInit() {
        this.nav.show();
        this.store.dispatch(CatalougeActions.Load());
    }

    ngOnDestroy() {
        this.cataloguesOfThisYearSubscription.unsubscribe();
        this.cataloguesOfNextYearSubscription.unsubscribe();
        this.cataloguesOfNextNextYearSubscription.unsubscribe();
        this.activeUserSubscribtion.unsubscribe();
    }
}
