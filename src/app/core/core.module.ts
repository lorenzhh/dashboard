import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ResourceInterceptor } from './interceptors/resource.interceptor';
import { GlobalErrorHandler } from './handlers/error.handler';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ResourceInterceptor, multi: true },
        { provide: ErrorHandler, useClass: GlobalErrorHandler }
    ]
})
export class CoreModule {}
