import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { dashboardAnimation } from 'app/shared/animation/dashboard.animation';
import { Catalogue } from 'app/shared/catalogues/catalogue.model';
import { CatalougeActions } from 'app/shared/catalogues/catalogues.actions';
import {
    allCatalogues,
    aprrovedCatalogues,
    findCatalogueById,
    isLoading,
    notAprrovedCatalogues
} from 'app/shared/catalogues/catalogues.selectors';
import { NavBarService } from 'app/shared/services/nav-bar.service';
import { AppState } from 'app/shared/store/app.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [dashboardAnimation],
    host: {
        '[@dashboardAnimation]': 'true'
    }
})
export class DashboardComponent implements OnInit {
    isLoading$: Observable<boolean>;
    catalogues$: Observable<Catalogue[]>;
    pdfType = 'application/pdf';
    zipType = 'application/x-zip-compressed';

    constructor(readonly nav: NavBarService, readonly store: Store<AppState>) {
        this.isLoading$ = this.store.pipe(select(isLoading));
        this.catalogues$ = this.store.pipe(select(allCatalogues));
    }

    ngOnInit() {
        this.nav.show();
        this.nav.setActiveView('dashboard');
        this.store.dispatch(CatalougeActions.Load());
    }

    deleteCatalogue(catalogue: Catalogue) {
        this.store.dispatch(CatalougeActions.Delete(catalogue));
    }

    approveCatalogue(catalogue: Catalogue) {
        this.store.dispatch(CatalougeActions.Approve(catalogue));
    }

    selectCatalogue(catalogue: Catalogue) {
        this.store.dispatch(CatalougeActions.Select(catalogue));
    }

    downloadCatalogue(catalogue: Catalogue) {
        this.store.dispatch(CatalougeActions.Download(catalogue));
    }

    uploadCatalogue(event: HTMLInputEvent) {
        const elem = event.target;
        if (elem.files.length > 0) {
            const formData: FormData = new FormData();
            formData.append('file', elem.files[0]);
            formData.append('file_name', formData.get('file')['name']);
            this.store.dispatch(CatalougeActions.Add({ formData }));
        }
    }

    showApproved() {
        this.catalogues$ = this.store.pipe(select(aprrovedCatalogues));
    }

    showNotApproved() {
        this.catalogues$ = this.store.pipe(select(notAprrovedCatalogues));
    }

    showAll() {
        this.catalogues$ = this.store.pipe(select(allCatalogues));
    }

    handleOption(selecetedOption: number) {
        if (selecetedOption === 0) {
            this.showAll();
        } else if (selecetedOption === 1) {
            this.showApproved();
        } else if (selecetedOption === 2) {
            this.showNotApproved();
        } else {
            this.showAll();
        }
    }

    filterOption(form: any) {
        if (form.id) {
            this.catalogues$ = this.store.pipe(
                select(findCatalogueById, { id: +form.id }),
                map(catalogue => [catalogue])
            );
        } else {
            this.showAll();
        }
    }
}
