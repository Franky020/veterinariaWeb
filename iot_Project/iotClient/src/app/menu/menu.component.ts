import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InfoComponent } from '../info/info.component';
import { AlimentadorComponent } from '../alimentador/alimentador.component';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterModule,
    InfoComponent,
    AlimentadorComponent,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

}
