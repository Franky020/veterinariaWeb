import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
//material elements
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HomeLayoutComponent } from '../../layout/home-layout/home-layout.component';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, RouterModule,  HomeLayoutComponent, MatButtonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario={
    email:'',
    password:''
  }

  constructor(private servicioLogin: LoginService, private router: Router) { }

  login() {
    debugger;
    this.servicioLogin.login(this.usuario).subscribe(
      res => {
        console.log(res);
        this.servicioLogin.getEmployee(res.user._id).subscribe(
          res2 => {
             console.log(res2);
            localStorage.setItem('jwtoken', res2.dataEmp.jwtoken);
            localStorage.setItem('idVet', res2.dataEmp._id);
            localStorage.setItem('nameVet', res2.dataEmp.name);
            localStorage.setItem('employeeType', res2.dataEmp.type);
            localStorage.setItem('vetLastName', res2.dataEmp.lastName);
            // console.log(res2.dataEmp._id);
            alert('Bienvenido ' + res2.dataEmp.name+ ' ' + res2.dataEmp.lastName);
          },
          error => {
            console.log(error);
          }
        );
        
        this.router.navigate(['/admin']);

      },
      error => {
        alert('Usuario o contraseña incorrectos');
        console.log(error);
      }
      
    );
    
  }
}
