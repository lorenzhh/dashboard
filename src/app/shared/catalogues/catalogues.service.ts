import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Catalogue } from 'app/shared/catalogues/catalogue.model';
import { InternetConnectionCheckService } from 'app/shared/services/internet-connection-check.service';
import { NotificationType } from 'app/shared/ui/notification/notification-type';
import { NotificationService } from 'app/shared/ui/notification/notification.service';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CataloguesService {
    internetConnectionAvailable: boolean;

    resourceName = 'catalogues';
    constructor(
        readonly httpClient: HttpClient,
        readonly notificationService: NotificationService,
        readonly checkConnection: InternetConnectionCheckService,
        @Inject(DOCUMENT) private document: any
    ) {
        this.checkConnection
            .InternetSituation()
            .subscribe((status: boolean) => (this.internetConnectionAvailable = status));
    }

    loadCatalogues(): Observable<Catalogue[]> {
        return this.httpClient.get<Catalogue[]>(this.getUrl(this.resourceName)).pipe(
            catchError((error: HttpErrorResponse) => {
                if (!this.internetConnectionAvailable) {
                    return this.handleResponse('No Internet Connection!', NotificationType.warn);
                }
                return this.handleResponse(error.statusText, NotificationType.error);
            })
        );
    }

    uploadCatalogue(data: FormData) {
        console.log(data);
        const body = {
            id: Math.floor(Math.random() * (8000 - 4000 + 1)) + 200,
            name: data.get('file_name'),
            path: 'https://s1.q4cdn.com/806093406/files/doc_downloads/test.pdf',
            expiryDate: new Date(),
            user: data.get('user_id'),
            approved: false
        };

        return this.httpClient.post(this.getUrl(this.resourceName), body).pipe(
            map(response => {
                this.handleResponse('File uploaded succesfully!', NotificationType.success);
                return response;
            }),
            catchError((error: HttpErrorResponse) => {
                if (!this.internetConnectionAvailable) {
                    return this.handleResponse('No Internet Connection!', NotificationType.warn);
                }
                return this.handleResponse(error.statusText, NotificationType.error);
            })
        );
    }

    deleteCatalogue(catalogue: Catalogue) {
        return this.httpClient.delete(this.getUrl(this.resourceName) + '/' + catalogue.id).pipe(
            map(() => {
                this.handleResponse('File deleted succesfully!', NotificationType.success);
                return catalogue;
            }),
            catchError((error: HttpErrorResponse) => {
                if (!this.internetConnectionAvailable) {
                    return this.handleResponse('No Internet Connection!', NotificationType.warn);
                }
                return this.handleResponse(error.statusText, NotificationType.error);
            })
        );
    }

    downloadCatalogue(catalogue: Catalogue) {
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
                }),
                catchError((error: HttpErrorResponse) => {
                    if (!this.internetConnectionAvailable) {
                        return this.handleResponse('No Internet Connection!', NotificationType.warn);
                    }
                    return this.handleResponse(error.statusText, NotificationType.error);
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

    approveCatalogue(catalogue: Catalogue) {
        const body: Catalogue = {
            id: catalogue.id,
            name: catalogue.name,
            path: catalogue.path,
            expiryDate: catalogue.expiryDate,
            user: catalogue.user,
            approved: true
        };

        return this.httpClient
            .put(this.getUrl(this.resourceName) + '/' + catalogue.id, body, {
                headers: this.getHeaders()
            })
            .pipe(
                map((updatedCatalogue: Catalogue) => {
                    this.handleResponse('File approved succesfully!', NotificationType.success);
                    return updatedCatalogue;
                }),
                catchError((error: HttpErrorResponse) => {
                    if (!this.internetConnectionAvailable) {
                        return this.handleResponse('No Internet Connection!', NotificationType.warn);
                    }
                    return this.handleResponse(error.statusText, NotificationType.error);
                })
            );
    }

    private getHeaders() {
        return new HttpHeaders().set('Content-Type', 'application/json');
    }

    private getUrl(resourceName: string): string {
        return environment.backendUrl + resourceName;
    }

    private handleResponse(response: string, type: NotificationType) {
        this.notificationService.showNotification(type, response);
        return throwError(response);
    }
}
