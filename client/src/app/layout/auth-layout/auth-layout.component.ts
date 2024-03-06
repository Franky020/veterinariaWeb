import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
//material components
import { MatToolbar } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterModule, MatToolbar, MatButtonModule],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent {

}
