import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Catalogue } from 'app/shared/catalogues/catalogue.model';
import * as moment from 'moment';
import { State } from './catalogues.reducer';

export const catalogueState = createFeatureSelector<State>('catalogue');

export const isLoading = createSelector(
    catalogueState,
    state => state.isLoading
);

export const allCatalogues = createSelector(
    catalogueState,
    state => state.catalogues
);

export const selectedCatalogue = createSelector(
    catalogueState,
    state => state.selected
);

export const cataloguesOfThisYear = createSelector(
    catalogueState,
    state =>
        state.catalogues.filter(
            (catalogue: Catalogue) => moment(catalogue.expiryDate).year() === moment().year()
        )
);

export const cataloguesOfNextYear = createSelector(
    catalogueState,
    state =>
        state.catalogues.filter(
            (catalogue: Catalogue) =>
                moment(catalogue.expiryDate).year() ===
                moment()
                    .add(1, 'years')
                    .year()
        )
);

export const cataloguesOfNextTwoYear = createSelector(
    catalogueState,
    state =>
        state.catalogues.filter(
            (catalogue: Catalogue) =>
                moment(catalogue.expiryDate).year() ===
                moment()
                    .add(2, 'years')
                    .year()
        )
);

export function getThisYear() {
    return moment().year();
}

export const aprrovedCatalogues = createSelector(
    catalogueState,
    state => state.catalogues.filter((catalogue: Catalogue) => catalogue.approved)
);

export const notAprrovedCatalogues = createSelector(
    catalogueState,
    state => state.catalogues.filter((catalogue: Catalogue) => !catalogue.approved)
);

export function getMonthOfYear(catalogues: Catalogue[]) {
    let jan = 0;
    let feb = 0;
    let mar = 0;
    let apr = 0;
    let mai = 0;
    let jun = 0;
    let jul = 0;
    let aug = 0;
    let sep = 0;
    let okt = 0;
    let nov = 0;
    let dec = 0;

    let date: moment.Moment;

    if (catalogues) {
        catalogues.forEach(catalogue => {
            date = moment(catalogue.expiryDate);
            if (date.month() === 0) {
                jan++;
            }
            if (date.month() === 1) {
                feb++;
            }
            if (date.month() === 2) {
                mar++;
            }
            if (date.month() === 3) {
                apr++;
            }
            if (date.month() === 4) {
                mai++;
            }
            if (date.month() === 5) {
                jun++;
            }
            if (date.month() === 6) {
                jul++;
            }
            if (date.month() === 7) {
                aug++;
            }
            if (date.month() === 8) {
                sep++;
            }
            if (date.month() === 9) {
                okt++;
            }
            if (date.month() === 10) {
                nov++;
            }
            if (date.month() === 11) {
                dec++;
            }
        });
        return [jan, feb, mar, apr, mai, jun, jul, aug, sep, okt, nov, dec];
    }
    return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}

export const expiredCatalogues = createSelector(
    catalogueState,
    state =>
        state.catalogues.filter((catalogue: Catalogue) =>
            moment(catalogue.expiryDate).isBefore(moment())
        )
);

export const soonCatalogues = createSelector(
    catalogueState,
    state =>
        state.catalogues.filter(
            (catalogue: Catalogue) =>
                moment(catalogue.expiryDate).isAfter(moment()) &&
                moment(catalogue.expiryDate).isBefore(
                    moment()
                        .add(365, 'days')
                        .endOf('day')
                )
        )
);

export const okCatalogues = createSelector(
    catalogueState,
    state =>
        state.catalogues.filter(
            (catalogue: Catalogue) =>
                moment(catalogue.expiryDate).isAfter(moment()) &&
                !moment(catalogue.expiryDate).isBefore(
                    moment()
                        .add(365, 'days')
                        .endOf('day')
                )
        )
);

export function DateCheckService(catalogues: Catalogue[]) {
    let expired = 0;
    let soon = 0;
    let ok = 0;
    let date: moment.Moment;
    let today: moment.Moment;
    let end: moment.Moment;

    if (catalogues) {
        catalogues.forEach(catalogue => {
            date = moment(catalogue.expiryDate);
            today = moment();
            end = moment()
                .add(365, 'days')
                .endOf('day');

            if (date.isBefore(today)) {
                expired++;
            }
            if (date.isAfter(today) && date.isBefore(end)) {
                soon++;
            }
            if (date.isAfter(today) && !date.isBefore(end)) {
                ok++;
            }
        });
        return [expired, soon, ok];
    }
    return [0, 0, 0];
}
