export interface Catalogue {
    id: number;
    name: string;
    path: string;
    expiryDate: Date;
    approved: boolean;
    user: number;
}
