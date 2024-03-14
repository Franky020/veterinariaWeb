import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

//services

//material elemments
import { MatCardModule } from '@angular/material/card';
import {MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';



@Component({
  selector: 'app-entries-services',
  standalone: true,
  imports: [MatCardModule, MatPaginatorModule,MatPaginator, MatTableModule, MatFormFieldModule, CommonModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './entries-services.component.html',
  styleUrl: './entries-services.component.css'
})
export class EntriesServicesComponent {
  displayedColumns: string[] = ['id', 'service', 'description', 'price'];
  dataSource: any;
  editData: any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  isadd = false;
  isedit = false;
  
  services: any;

  service = {
    id: 0,
    service: '',
    description: '',
    price: 0
  }

  constructor(private builder: FormBuilder){}

  ngOnInit(){
    this.get_services();
  }
  get_services(){
    this.services = [
      {id: 1, service: 'Corte de Cabello', description: 'Corte de cabello para caballero', price: 100, state: 'Activo'},
      {id: 2, service: 'Corte de Barba', description: 'Corte de barba para caballero', price: 50, state: 'Activo'},
    ]
    this.dataSource = null;
    this.dataSource = new MatTableDataSource(this.services);
    this.dataSource.paginator = this.paginator;

  }

  servicesForm = this.builder.group({
    id: this.builder.control({value:0, disabled:true}),
    service: this.builder.control('', Validators.required),
    description: this.builder.control('', Validators.required),
    price: this.builder.control('', Validators.required),
  })

  addService(){
    this.isadd=true;
  }

  backtolist(){
    this.isadd=false;
    this.get_services;
  }
}
