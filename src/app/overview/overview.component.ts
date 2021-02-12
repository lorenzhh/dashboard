import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { overviewAnimation } from 'app/shared/animation/overview.Animation';
import { Catalogue } from 'app/shared/catalogues/catalogue.model';
import { CatalougeActions } from 'app/shared/catalogues/catalogues.actions';
import {
    allCatalogues,
    DateCheckService,
    expiredCatalogues,
    okCatalogues,
    soonCatalogues
} from 'app/shared/catalogues/catalogues.selectors';
import { ChartData } from 'app/shared/chart/chart-data.model';
import { NavBarService } from 'app/shared/services/nav-bar.service';
import { AppState } from 'app/shared/store/app.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [overviewAnimation],
    host: {
        '[@overviewAnimation]': 'true',
        '[style.display]': '"block"',
        '[style.position]': '"absolute"'
    }
})
export class OverviewComponent implements OnInit {
    catalogues: Observable<Catalogue[]>;
    title = 'Alle Kataloge';
    chartData: ChartData;
    pieType = 'pie';
    labels: string[] = ['Abgelaufen', 'Bald', 'In Ordnung'];

    constructor(readonly nav: NavBarService, readonly store: Store<AppState>) {
        this.catalogues = this.store.pipe(select(allCatalogues));
        this.catalogues.subscribe(catalogues => {
            this.chartData = [
                {
                    data: DateCheckService(catalogues)
                }
            ];
        });
    }

    ngOnInit(): void {
        this.nav.show();
        this.nav.setActiveView('overview');
        this.store.dispatch(CatalougeActions.Load());
    }

    selectedCatalogue(catalogue: Catalogue) {
        console.log(catalogue);
    }

    selectedPie(e: any): void {
        if (e.active[0]) {
            const selectedChart = e.active[0]._index;
            if (selectedChart === 0) {
                this.title = 'Abgelaufene Kataloge';
                this.catalogues = this.store.pipe(select(expiredCatalogues));
            }
            if (selectedChart === 1) {
                this.title = 'Kataloge, die bald ablaufen';
                this.catalogues = this.store.pipe(select(soonCatalogues));
            }
            if (selectedChart === 2) {
                this.title = 'Kataloge, die in Ordnung sind';
                this.catalogues = this.store.pipe(select(okCatalogues));
            }
        } else {
            this.title = 'Alle Kataloge';
            this.catalogues = this.store.pipe(select(allCatalogues));
        }
    }
}
