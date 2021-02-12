import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CatalogueListComponent } from 'app/overview/catalogue-list/catalogue-list.component';
import { OverviewRoutingModule } from 'app/overview/overview-routing.module';
import { OverviewComponent } from 'app/overview/overview.component';
import { PipesModule } from 'app/shared/ui/pipes/pipes.module';
import { UiModule } from 'app/shared/ui/ui.module';

@NgModule({
    imports: [CommonModule, UiModule, OverviewRoutingModule, PipesModule],

    declarations: [OverviewComponent, CatalogueListComponent]
})
export class OverviewModule {}
