import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { overviewAnimation } from 'app/shared/animation/overview.Animation';
import { Catalogue } from 'app/shared/catalogues/catalogue.model';
import { CatalougeActions } from 'app/shared/catalogues/catalogues.actions';
import {
    DateCheckService,
    getAllCataloguesForUser,
    getExpiredCatalogues,
    getOkCatalogues,
    getSoonCatalogues
} from 'app/shared/catalogues/catalogues.selectors';
import { ChartData } from 'app/shared/chart/chart-data.model';
import { NavBarService } from 'app/shared/services/nav-bar.service';
import { AppState } from 'app/shared/store/app.model';
import { User } from 'app/shared/user/user.model';
import { getCurrentUser } from 'app/shared/user/user.selectors';
import { isNil } from 'lodash';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.css'],
    animations: [overviewAnimation],
    host: {
        '[@overviewAnimation]': 'true',
        '[style.display]': '"block"',
        '[style.position]': '"absolute"'
    }
})
export class OverviewComponent implements OnInit, OnDestroy {
    catalogues: Observable<Catalogue[]>;
    title = 'Alle Kataloge';
    chartData: ChartData;
    Subscription: Subscription;
    activeUserSubscribtion: Subscription;
    currentUser: User;
    pieType = 'pie';
    labels: string[] = ['Abgelaufen', 'Bald', 'In Ordnung'];

    constructor(readonly nav: NavBarService, readonly store: Store<AppState>) {
        this.activeUserSubscribtion = this.store
            .select(getCurrentUser())
            .subscribe(activeUser => (this.currentUser = activeUser));
        this.catalogues = this.store.select(getAllCataloguesForUser());
        this.Subscription = this.catalogues.subscribe(catalogues => {
            this.chartData = [
                {
                    data: DateCheckService(catalogues)
                }
            ];
        });
    }

    ngOnInit() {
        this.nav.show();
        this.nav.setActiveView('overview');
        this.store.dispatch(CatalougeActions.Load());
    }

    ngOnDestroy() {
        this.Subscription.unsubscribe();
        this.activeUserSubscribtion.unsubscribe();
    }

    selectedCatalogue(catalogue: Catalogue) {
        console.log(catalogue);
    }

    selectedPie(e: any): void {
        if (!isNil(e.active[0])) {
            const selectedChart = e.active[0]._index;
            if (selectedChart === 0) {
                this.title = 'Abgelaufene Kataloge';
                this.catalogues = this.store.select(getExpiredCatalogues());
            }
            if (selectedChart === 1) {
                this.title = 'Kataloge, die bald ablaufen';
                this.catalogues = this.store.select(getSoonCatalogues());
            }
            if (selectedChart === 2) {
                this.title = 'Kataloge, die in Ordnung sind';
                this.catalogues = this.store.select(getOkCatalogues());
            }
        } else {
            this.title = 'Alle Kataloge';
            this.catalogues = this.store.select(getAllCataloguesForUser());
        }
    }
}
