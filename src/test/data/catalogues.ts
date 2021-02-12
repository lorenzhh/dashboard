import { cloneDeep } from 'lodash';
import { Catalogue } from 'app/shared/catalogues/catalogue.model';

const catalogues: Catalogue[] = [
    {
        id: 1,
        name: 'catalogue 1',
        path: 'https://test.com/pdf',
        expiryDate: new Date(),
        approved: false,
        user: 1
    },
    {
        id: 1,
        name: 'catalogue 1',
        path: 'https://test.com/pdf',
        expiryDate: new Date(),
        approved: false,
        user: 1
    },
    {
        id: 1,
        name: 'catalogue 1',
        path: 'https://test.com/pdf',
        expiryDate: new Date(),
        approved: false,
        user: 1
    }
];

export function getAllCatalogues() {
    return cloneDeep(catalogues);
}
