import { Routes } from '@angular/router';

export const routes: Routes = [
    //layout auth
    {
        path:'',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    //layout dashboard
    {
        path: '',
        loadChildren: () =>import('./dashboard/dashboard.module').then(m => m.DashboardModule)

    }

    
];

export class AppRoutingModule { }
