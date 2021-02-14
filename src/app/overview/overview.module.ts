import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CatalogueListComponent } from 'app/overview/catalogue-list/catalogue-list.component';
import { OverviewRoutingModule } from 'app/overview/overview-routing.module';
import { OverviewComponent } from 'app/overview/overview.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    imports: [CommonModule, OverviewRoutingModule, SharedModule],

    declarations: [OverviewComponent, CatalogueListComponent]
})
export class OverviewModule {}
