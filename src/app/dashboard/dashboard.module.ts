import { NgModule } from '@angular/core';
import { CatalogueComponent } from 'app/dashboard/catalogue/catalogue.component';
import { DashboardRoutingModule } from 'app/dashboard/dashboard-routing.module';
import { DashboardComponent } from 'app/dashboard/dashboard.component';
import { FilterButtonComponent } from 'app/dashboard/filter-button/filter-button.component';
import { ReportComponent } from 'app/dashboard/report/report.component';
import { SearchButtonComponent } from 'app/dashboard/search-button/search-button.component';
import { UploadButtonComponent } from 'app/dashboard/upload-button/upload-button.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [
        DashboardComponent,
        CatalogueComponent,
        UploadButtonComponent,
        FilterButtonComponent,
        SearchButtonComponent,
        ReportComponent
    ],
    imports: [DashboardRoutingModule, SharedModule]
})
export class DashboardModule {}
