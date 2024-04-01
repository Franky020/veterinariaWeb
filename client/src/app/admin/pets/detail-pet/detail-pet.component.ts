import { Component, ViewChild } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

//material elements
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';


@Component({
  selector: 'app-detail-pet',
  standalone: true,
  imports: [MatTabsModule, MatCardModule, MatPaginatorModule, MatPaginator, MatTableModule, MatFormFieldModule, CommonModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatInputModule, RouterModule],
  templateUrl: './detail-pet.component.html',
  styleUrl: './detail-pet.component.css'
})
export class DetailPetComponent {

  displayedColumns: string[] = ['id', 'name', 'lastName', 'phone', 'email', 'image'];
  displayedColumns2: string[] = ['vaccineName', 'dateAdministered', 'veterinarian', 'notes'];

  dataSource: any;
  dataSource2: any;
  owners: any;

  owner = {
    id: 0,
    name: '',
    lastName: '',
    phone: '',
    email: '',
    image: '',
    password: ''
  }
  constructor() { }
  
  ngOnInit(): void {
    this.get_history();
    this.get_history2();
  }

  get_history(){
    this.dataSource = new MatTableDataSource([
      { id: 1, name: 'John', lastName: 'Doe', phone: '1234567890', email: 'john@example.com', image: 'image-url', action: 'edit' },
      { id: 2, name: 'Jane', lastName: 'Smith', phone: '9876543210', email: 'jane@example.com', image: 'image-url', action: 'edit' },
      // Add more objects as needed
    ]);
  }

  get_history2(){
    this.dataSource2 = new MatTableDataSource([
      { vaccineName: 'Rabies', dateAdministered: '2021-01-01', veterinarian: 'Dr. Smith', notes: 'Notes' },
      { vaccineName: 'Distemper', dateAdministered: '2021-01-01', veterinarian: 'Dr. Smith', notes: 'Notes' },
      // Add more objects as needed
    ]);
  }


}
