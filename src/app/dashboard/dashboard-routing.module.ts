import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'app/dashboard/dashboard.component';
import { ReportComponent } from 'app/dashboard/report/report.component';
import { CataloguesResolver } from './resolvers/catalogues.resolver';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent
        // canDeactivate: [UnsavedChangesGuard]
    },
    {
        path: ':id',
        component: ReportComponent,
        resolve: { catalogue: CataloguesResolver }
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {}
