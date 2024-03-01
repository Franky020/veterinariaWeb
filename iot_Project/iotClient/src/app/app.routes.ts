import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InfoComponent } from './info/info.component';
import { AlimentadorComponent } from './alimentador/alimentador.component';

export const routes: Routes = [
    {path: "login", component:LoginComponent},
    {path: "info", component:InfoComponent},
    {path: "alimentar", component:AlimentadorComponent},
    {path: "**", redirectTo: "/login"},
];
