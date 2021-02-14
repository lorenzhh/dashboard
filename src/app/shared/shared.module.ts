import { ModuleWithProviders, NgModule } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { UiModule } from './ui/ui.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { PipesModule } from './ui/pipes/pipes.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        SimpleNotificationsModule.forRoot(),
        PdfViewerModule,
        UiModule,
        SimpleNotificationsModule,
        PipesModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [],
    exports: [
        CommonModule,
        SimpleNotificationsModule,
        PdfViewerModule,
        UiModule,
        SimpleNotificationsModule,
        PipesModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule
        };
    }
}
