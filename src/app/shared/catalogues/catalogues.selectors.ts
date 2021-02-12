import { Catalogue } from 'app/shared/catalogues/catalogue.model';
import { AppState } from 'app/shared/store/app.model';
import * as moment from 'moment';

export function getIsLoading() {
    return (state: AppState) => state.catalogue.isLoading;
}

export function getAllCataloguesForUser() {
    return (state: AppState) => state.catalogue.catalogues;
}

export function getSelectedCatalogue() {
    return (state: AppState) => state.catalogue.selected;
}

export function getCataloguesOfThisYear() {
    return (state: AppState) =>
        state.catalogue.catalogues.filter(
            (catalogue: Catalogue) => moment(catalogue.expiryDate).year() === moment().year()
        );
}

export function getCataloguesOfNextYear() {
    return (state: AppState) =>
        state.catalogue.catalogues.filter(
            (catalogue: Catalogue) =>
                moment(catalogue.expiryDate).year() ===
                moment()
                    .add(1, 'years')
                    .year()
        );
}

export function getCataloguesOfNextNextYear() {
    return (state: AppState) =>
        state.catalogue.catalogues.filter(
            (catalogue: Catalogue) =>
                moment(catalogue.expiryDate).year() ===
                moment()
                    .add(2, 'years')
                    .year()
        );
}

export function getThisYear() {
    return moment().year();
}

export function getAprrovedCatalogues() {
    return (state: AppState) =>
        state.catalogue.catalogues.filter((catalogue: Catalogue) => catalogue.approved);
}

export function getNotAprrovedCatalogues() {
    return (state: AppState) =>
        state.catalogue.catalogues.filter((catalogue: Catalogue) => !catalogue.approved);
}

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

export function getExpiredCatalogues() {
    return (state: AppState) =>
        state.catalogue.catalogues.filter((catalogue: Catalogue) =>
            moment(catalogue.expiryDate).isBefore(moment())
        );
}

export function getSoonCatalogues() {
    return (state: AppState) =>
        state.catalogue.catalogues.filter(
            (catalogue: Catalogue) =>
                moment(catalogue.expiryDate).isAfter(moment()) &&
                moment(catalogue.expiryDate).isBefore(
                    moment()
                        .add(365, 'days')
                        .endOf('day')
                )
        );
}

export function getOkCatalogues() {
    return (state: AppState) =>
        state.catalogue.catalogues.filter(
            (catalogue: Catalogue) =>
                moment(catalogue.expiryDate).isAfter(moment()) &&
                !moment(catalogue.expiryDate).isBefore(
                    moment()
                        .add(365, 'days')
                        .endOf('day')
                )
        );
}

export function DateCheckService(catalogues: Catalogue[]) {
    let expiredCatalogues = 0;
    let soonCatalogues = 0;
    let okCatalogues = 0;
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
                expiredCatalogues++;
            }
            if (date.isAfter(today) && date.isBefore(end)) {
                soonCatalogues++;
            }
            if (date.isAfter(today) && !date.isBefore(end)) {
                okCatalogues++;
            }
        });
        return [expiredCatalogues, soonCatalogues, okCatalogues];
    }
    return [0, 0, 0];
}

export function getCataloguesOnSearch(id: number) {
    return (state: AppState) =>
        state.catalogue.catalogues.filter((catalogue: Catalogue) => catalogue.id === id);
}
