import { Component } from '@angular/core';
//components
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavigationComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
