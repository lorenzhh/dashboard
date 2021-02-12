import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { dashboardAnimation } from 'app/shared/animation/dashboard.animation';
import { Catalogue } from 'app/shared/catalogues/catalogue.model';
import { CatalougeActions } from 'app/shared/catalogues/catalogues.actions';
import {
    getAllCataloguesForUser,
    getAprrovedCatalogues,
    getCataloguesOnSearch,
    getIsLoading,
    getNotAprrovedCatalogues
} from 'app/shared/catalogues/catalogues.selectors';
import { NavBarService } from 'app/shared/services/nav-bar.service';
import { AppState } from 'app/shared/store/app.model';
import { User } from 'app/shared/user/user.model';
import { getCurrentUser } from 'app/shared/user/user.selectors';
import { Observable, Subscription } from 'rxjs';

interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    animations: [dashboardAnimation],
    host: {
        '[@dashboardAnimation]': 'true',
        '[style.display]': '"block"',
        '[style.position]': '"absolute"'
    }
})
export class DashboardComponent implements OnInit, OnDestroy {
    isLoading: Observable<boolean>;
    activeUserSubscribtion: Subscription;
    catalogues: Observable<Catalogue[]>;
    currentUser: User;
    pdfType = 'application/pdf';
    zipType = 'application/x-zip-compressed';

    constructor(readonly nav: NavBarService, readonly store: Store<AppState>) {
        this.isLoading = this.store.select(getIsLoading());

        this.activeUserSubscribtion = this.store
            .select(getCurrentUser())
            .subscribe(activeUser => (this.currentUser = activeUser));
        this.catalogues = this.store.select(getAllCataloguesForUser());
    }

    ngOnInit() {
        this.nav.show();
        this.nav.setActiveView('dashboard');
        this.store.dispatch(CatalougeActions.Load());
    }

    ngOnDestroy() {
        this.activeUserSubscribtion.unsubscribe();
    }

    deleteCatalogue(catalogue: Catalogue) {
        this.store.dispatch(CatalougeActions.Delete(catalogue));
    }

    approveCatalogue(catalogue: Catalogue) {
        this.store.dispatch(CatalougeActions.Approve(catalogue));
    }

    downloadCatalogue(catalogue: Catalogue) {
        this.store.dispatch(CatalougeActions.Download(catalogue));
    }

    uploadCatalogue(event: HTMLInputEvent) {
        const elem = event.target;
        if (elem.files.length > 0) {
            const formData: FormData = new FormData();
            formData.append('file', elem.files[0]);
            formData.append('user_id', this.currentUser.id.toString());
            formData.append('file_name', formData.get('file')['name']);
            if (formData.get('file')['type'] === this.pdfType) {
                this.store.dispatch(CatalougeActions.Add({ formData }));
            } else {
                event.target.value = null;
                event.target.click();
            }
        }
    }

    showApproved() {
        this.catalogues = this.store.select(getAprrovedCatalogues());
    }

    showNotApproved() {
        this.catalogues = this.store.select(getNotAprrovedCatalogues());
    }

    showAll() {
        this.catalogues = this.store.select(getAllCataloguesForUser());
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
        console.log(form);
        if (form.id) {
            this.catalogues = this.store.select(getCataloguesOnSearch(+form.id));
        } else {
            this.showAll();
        }
    }
}
