import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from '../layout/home-layout/home-layout.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: 'admin',
    component: HomeLayoutComponent,
    children: [
      {
        path:'dash', component: DashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
