export type CatalogueKey = number;

export interface Catalogue {
    id: CatalogueKey;
    name: string;
    path: string;
    expiryDate: Date;
    approved: boolean;
}
