import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//layouts
import { AuthLayoutComponent } from '../layout/auth-layout/auth-layout.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  {path: '', 
  component: AuthLayoutComponent,
    children: [
      {path: '', component: LandingComponent},
      {path: 'login', component: LoginComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
