import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Catalogue, CatalogueKey } from 'app/shared/catalogues/catalogue.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CataloguesService {
    resourceName = 'catalogues';
    constructor(readonly httpClient: HttpClient, @Inject(DOCUMENT) private document: any) {}

    loadAll(): Observable<Catalogue[]> {
        return this.httpClient.get<Catalogue[]>(this.resourceName);
    }

    loadOne(id: CatalogueKey): Observable<Catalogue> {
        return this.httpClient.get<Catalogue>(this.resourceName + '/' + id);
    }

    upload(data: FormData) {
        const body: Catalogue = {
            id: Math.floor(Math.random() * (8000 - 4000 + 1)) + 200,
            name: data.get('file_name') as string,
            path: 'https://s1.q4cdn.com/806093406/files/doc_downloads/test.pdf',
            expiryDate: new Date(),
            approved: false
        };

        return this.httpClient.post(this.resourceName, body);
    }

    delete(catalogue: Catalogue) {
        return this.httpClient.delete(this.resourceName + '/' + catalogue.id);
    }

    download(catalogue: Catalogue) {
        return this.httpClient
            .get('/pdf', {
                responseType: 'blob'
            })
            .pipe(
                map(response => {
                    const mediaType = 'application/pdf';
                    const blob = new Blob([response], { type: mediaType });
                    const catalogueName = catalogue.name;
                    return this.saveFile(blob, catalogueName.toString().trim());
                })
            );
    }

    private saveFile(blob: Blob, fileName: string): void {
        const url = window.URL.createObjectURL(blob);
        const link = this.document.createElement('a');
        link.href = url;
        link.download = fileName;
        this.document.body.appendChild(link);
        link.click();
        this.document.body.removeChild(link);
    }

    approve(catalogue: Catalogue) {
        const cloned: Catalogue = Object.assign(catalogue);
        cloned.approved = true;

        return this.httpClient.put(this.resourceName + '/' + catalogue.id, cloned);
    }
}
