import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Catalogue } from 'app/shared/catalogues/catalogue.model';
import { CatalougeActions } from 'app/shared/catalogues/catalogues.actions';
import {
    getCataloguesOfNextNextYear,
    getCataloguesOfNextYear,
    getCataloguesOfThisYear,
    getMonthOfYear,
    getThisYear
} from 'app/shared/catalogues/catalogues.selectors';
import { ChartData } from 'app/shared/chart/chart-data.model';
import { NavBarService } from 'app/shared/services/nav-bar.service';
import { AppState } from 'app/shared/store/app.model';
import { User } from 'app/shared/user/user.model';
import { getCurrentUser } from 'app/shared/user/user.selectors';
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
            .select(getCurrentUser())
            .subscribe(activeUser => (this.currentUser = activeUser));

        this.cataloguesOfThisYear = this.store.select(getCataloguesOfThisYear());
        this.cataloguesOfThisYearSubscription = this.cataloguesOfThisYear.subscribe(
            catalogues =>
                (this.chartDataOfThisYear = [
                    {
                        data: getMonthOfYear(catalogues)
                    }
                ])
        );
        this.cataloguesOfNextYear = this.store.select(getCataloguesOfNextYear());
        this.cataloguesOfNextYearSubscription = this.cataloguesOfNextYear.subscribe(
            catalogues =>
                (this.chartDataOfNextYear = [
                    {
                        data: getMonthOfYear(catalogues)
                    }
                ])
        );
        this.cataloguesOfNextNextYear = this.store.select(getCataloguesOfNextNextYear());
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
