import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { CataloguesService } from 'app/shared/catalogues/catalogues.service';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Catalogue } from './catalogue.model';
import { CatalougeActions } from './catalogues.actions';

@Injectable()
export class CataloguesEffects {
    loadCatalogues$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(CatalougeActions.Load),
            switchMap(() =>
                this.cataloguesService.loadCatalogues().pipe(
                    map((catalogues: Catalogue[]) => CatalougeActions.Loaded({ payload: catalogues })),
                    catchError(() => of(CatalougeActions.LoadError({ payload: [] })))
                )
            )
        )
    );

    addCatalogue$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(CatalougeActions.Add),
            switchMap(payload => {
                console.log(payload);
                return this.cataloguesService.uploadCatalogue(payload.formData).pipe(
                    map((catalogue: Catalogue) => CatalougeActions.Added(catalogue)),
                    catchError(() => of(CatalougeActions.AddError(null)))
                );
            })
        )
    );

    downloadCatalogue$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CatalougeActions.Download),
            switchMap(catalogue =>
                this.cataloguesService.downloadCatalogue(catalogue).pipe(
                    map(() => CatalougeActions.Downloaded(catalogue)),
                    catchError(() => of(CatalougeActions.DownloadError(null)))
                )
            )
        )
    );

    deleteCatalogue$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CatalougeActions.Delete),
            switchMap(catalogue =>
                this.cataloguesService.deleteCatalogue(catalogue).pipe(
                    map(() => CatalougeActions.Deleted(catalogue)),
                    catchError(() => of(CatalougeActions.DeleteError(catalogue)))
                )
            )
        )
    );

    approveCatalogue$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CatalougeActions.Approve),
            switchMap(catalouge =>
                this.cataloguesService.approveCatalogue(catalouge).pipe(
                    map((catalogue: Catalogue) => CatalougeActions.Approved(catalogue)),
                    catchError((catalogue: Catalogue) => of(CatalougeActions.ApproveError(catalogue)))
                )
            )
        )
    );

    constructor(readonly actions$: Actions, readonly cataloguesService: CataloguesService) {}
}
