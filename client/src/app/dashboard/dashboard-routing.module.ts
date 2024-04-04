import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from '../layout/home-layout/home-layout.component';
import { DashboardComponent } from './dashboard.component';
import { ServicesComponent } from '../admin/services/services.component';
import { ProductsComponent } from '../admin/products/products.component';
import { MedicinesComponent } from '../admin/medicines/medicines.component';
import { EntriesProductsComponent } from '../admin/entries-products/entries-products.component';
import { EntriesMedicinesComponent } from '../admin/entries-medicines/entries-medicines.component';
import { EntriesServicesComponent } from '../admin/entries-services/entries-services.component';
import { EmployeesComponent } from '../admin/employees/employees.component';
import { OwnersComponent } from '../admin/owners/owners.component';
import { PetsComponent } from '../admin/pets/pets.component';
import { DetailOwnerComponent } from '../admin/owners/detail-owner/detail-owner.component';
import { DetailPetComponent } from '../admin/pets/detail-pet/detail-pet.component';
import { ConsultationsComponent } from '../admin/consultations/consultations.component';

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
      { path:'medicines', component: MedicinesComponent },
      { path:'entries/products', component: EntriesProductsComponent },
      { path:'entries/medicines', component: EntriesMedicinesComponent },
      { path:'entries/services', component: EntriesServicesComponent },
      { path:'employees', component: EmployeesComponent },
      { path:'owners', component: OwnersComponent },
      { path:'pets', component: PetsComponent},
      // { path:'owners/details/:id', component: DetailOwnerComponent}
      { path:'owners/details', component: DetailOwnerComponent},
      { path:'pets/details', component: DetailPetComponent},
      {path:'consultations', component: ConsultationsComponent}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
