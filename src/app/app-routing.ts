import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/shared/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full'
    },
    {
        path: 'welcome',
        loadChildren: () => import('app/welcome/welcome.module').then(m => m.WelcomeModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        loadChildren: () => import('app/login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'overview',
        loadChildren: () => import('app/overview/overview.module').then(m => m.OverviewModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'dashboard',
        loadChildren: () => import('app/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: 'welcome',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
