import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {  RouterModule } from '@angular/router';
//material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';

//components
import { ServicesComponent } from '../admin/services/services.component';
import { LoginService } from '../services/login.service';
import { LoginComponent } from '../auth/login/login.component';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [MatSidenavModule, MatToolbarModule, MatIconModule, AsyncPipe, CommonModule, RouterModule, MatListModule, MatMenuModule, ServicesComponent, LoginComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent  {
  private breakpointObserver = inject(BreakpointObserver);
  employeeName: any;
  employeeLastName: any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    constructor(public servicioLogin: LoginService){}

    cerrarsesion(){
      this.servicioLogin.cerrarsesion();
    }

    ngOnInit(): void {
      this.employeeName = localStorage.getItem('nameVet');
      this.employeeLastName = localStorage.getItem('vetLastName');
      }
}
