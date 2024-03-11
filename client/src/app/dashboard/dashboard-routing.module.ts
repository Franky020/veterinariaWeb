import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from '../layout/home-layout/home-layout.component';
import { DashboardComponent } from './dashboard.component';
import { ServicesComponent } from '../admin/services/services.component';
import { ProductsComponent } from '../admin/products/products.component';
import { MedicinesComponent } from '../admin/medicines/medicines.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path:'', component: DashboardComponent
      },
      { path:'services', component: ServicesComponent },
      { path:'products', component: ProductsComponent },
      { path:'medicines', component: MedicinesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
