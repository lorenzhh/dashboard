import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChartComponent } from 'app/shared/ui/chart/chart.component';
import { ConfirmationModalComponent } from 'app/shared/ui/confirmation-modal/confirmation-modal.component';
import { NavigationComponent } from 'app/shared/ui/navigation/navigation.component';
import { SpinnerComponent } from 'app/shared/ui/spinner/spinner.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
    imports: [CommonModule, RouterModule, ChartsModule],
    declarations: [
        NavigationComponent,
        ConfirmationModalComponent,
        ChartComponent,
        SpinnerComponent
    ],
    exports: [NavigationComponent, ChartComponent, SpinnerComponent],
    entryComponents: [ConfirmationModalComponent]
})
export class UiModule {}
