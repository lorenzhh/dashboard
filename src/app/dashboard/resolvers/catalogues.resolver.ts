import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Catalogue } from 'app/shared/catalogues/catalogue.model';
import { CatalougeActions } from 'app/shared/catalogues/catalogues.actions';
import { selectedCatalogue } from 'app/shared/catalogues/catalogues.selectors';
import { AppState } from 'app/shared/store/app.model';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CataloguesResolver implements Resolve<Catalogue> {
    constructor(private store: Store<AppState>) {}

    waitForCatalogToLoad(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.store.dispatch(CatalougeActions.LoadOne({ id: route.params.id }));
        return this.store.pipe(
            select(selectedCatalogue),
            filter(selected => !!selected),
            take(1)
        );
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Catalogue> {
        return this.waitForCatalogToLoad(route, state);
    }
}
