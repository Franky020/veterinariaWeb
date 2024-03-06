import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from '../../navigation/navigation.component';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [RouterModule, NavigationComponent],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.css'
})
export class HomeLayoutComponent {

}
