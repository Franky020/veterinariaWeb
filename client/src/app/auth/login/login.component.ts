import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
//material elements
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

import { HomeLayoutComponent } from '../../layout/home-layout/home-layout.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, RouterModule,  HomeLayoutComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
