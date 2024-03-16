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
import { ServicioService } from '../../services/servicio.service';



@Component({
  selector: 'app-services',
  standalone: true,
  imports: [MatCardModule, MatPaginatorModule,MatPaginator, MatTableModule, MatFormFieldModule, CommonModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  displayedColumns: string[] = ['id', 'service', 'description', 'category','priceF', 'priceC', 'action'];
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
    category: '',
    priceFP: 0,
    priceFM: 0,
    priceFG: 0,
    priceCP: 0,
    priceCM: 0,
    priceCG: 0
  }

  constructor(private servicioSer: ServicioService, private builder: FormBuilder){}

  ngOnInit(){
    this.get_services();
  }
  get_services(){
   
    this.servicioSer.getServices().subscribe(res=>{
      this.services = res;
      this.dataSource = new MatTableDataSource(this.services.services);
      this.dataSource.paginator = this.paginator;
    
    });
  }

  servicesForm = this.builder.group({
    id: this.builder.control({value:0, disabled:true}),
    service: this.builder.control('', Validators.required),
    description: this.builder.control('', Validators.required),
    category: this.builder.control('', Validators.required),
    priceFP: this.builder.control('', Validators.required),
    priceFM: this.builder.control('', Validators.required),
    priceFG: this.builder.control('', Validators.required),
    priceCP: this.builder.control('', Validators.required),
    priceCM: this.builder.control('', Validators.required),
    priceCG: this.builder.control('', Validators.required)

  })

  addService(){
    this.isadd=true;
  }

  backtolist(){
    this.isadd=false;
    this.get_services;
  }

  saveService(){
    this.servicioSer.addService(
      this.service.service,
      this.service.description,
      this.service.category,
      {
        P: this.service.priceFP,
        M: this.service.priceFM,
        G: this.service.priceFG
      },
      {
        P: this.service.priceCP,
        M: this.service.priceCM,
        G: this.service.priceCG
      }
    ).subscribe(res=>{
      this.isadd=false;
      alert('Servicio agregado');
      this.get_services();
    },
    err=>{
      console.log(err);
    });
  }
}
