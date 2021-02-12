import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from 'app/dashboard/dashboard.component';
import { ReportComponent } from 'app/dashboard/report/report.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        pathMatch: 'full'
    },
    {
        path: ':id',
        component: ReportComponent
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }

];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],

    exports: [
        RouterModule
    ],

    providers: []
})

export class DashboardRoutingModule { }
