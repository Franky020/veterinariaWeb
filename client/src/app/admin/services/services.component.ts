import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

//services

//material elemments
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ServicioService } from '../../services/servicio.service';
import { MatSelectModule } from '@angular/material/select';


interface Category {
  value: string;
  viewValue: string;
}

interface State {
  value: string;
  viewValue: string;

}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [MatCardModule, MatPaginatorModule, MatPaginator, MatTableModule, MatFormFieldModule, CommonModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatInputModule, MatSelectModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  displayedColumns: string[] = ['id', 'service', 'description', 'category', 'priceF', 'priceC', 'state', 'action'];
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
    felino: { P: 0, M: 0, G: 0 },
    canino: { P: 0, M: 0, G: 0 },
    state: ''
  }

  //select components
  categories: Category[] = [
    { value: 'Estetica', viewValue: 'Estetica' },
    { value: 'Medica', viewValue: 'Medica' }
  ];

  states: State[] = [
    { value: 'activo', viewValue: 'Activo' },
    { value: 'inactivo', viewValue: 'Inactivo' }
  ];
  constructor(private servicioSer: ServicioService, private builder: FormBuilder) { }

  ngOnInit() {
    this.get_services();
  }
  get_services() {

    this.servicioSer.getServices().subscribe(res => {
      this.services = res;
      this.dataSource = new MatTableDataSource(this.services.services);
      this.dataSource.paginator = this.paginator;

    });
  }

  servicesForm = this.builder.group({
    id: this.builder.control({ value: 0, disabled: true }),
    service: this.builder.control('', Validators.required),
    description: this.builder.control('', Validators.required),
    category: this.builder.control('', Validators.required),
    felino: this.builder.group({
      P: this.builder.control(0),
      M: this.builder.control(0),
      G: this.builder.control(0)
    }),
    canino: this.builder.group({
      P: this.builder.control(0),
      M: this.builder.control(0),
      G: this.builder.control(0)
    }),
    state: this.builder.control('', Validators.required)


  })

  addService() {
    this.isadd = true;
  }

  backtolist() {
    this.isadd = false;
    this.isedit = false;
    this.get_services;
  }

  saveService() {
      if (this.isadd) {
        this.servicioSer.addService(
          this.service.service,
          this.service.description,
          this.service.category,
          this.service.felino,
          this.service.canino
        ).subscribe(res => {
          this.isadd = false;
          alert('Servicio agregado');
          this.get_services();
        },
          err => {
            console.log(err);
          });
      } else {
        this.servicioSer.editService(
          this.service.id,
          this.service.service,
          this.service.description,
          this.service.category,
          this.service.felino,
          this.service.canino,
          this.service.state
        ).subscribe(res => {
          this.isedit = false;
          alert('Servicio editado');
          this.get_services();
        },
          err => {
            console.log(err);
          });
      }
    


  }

  showService(id: number) {
    debugger;
    this.servicioSer.getServicesById(id).subscribe(res => {
      this.editData = res;
      console.log(this.editData);
      this.servicesForm.setValue({
        id: this.editData.service._id,
        service: this.editData.service.service,
        description: this.editData.service.description,
        category: this.editData.service.category,
        felino: {
          P: this.editData.service.felino?.P,
          M: this.editData.service.felino?.M,
          G: this.editData.service.felino?.G
        },
        canino: {
          P: this.editData.service.canino?.P,
          M: this.editData.service.canino?.M,
          G: this.editData.service.canino?.G
        },
        state: this.editData.service.state
      });
    });
    this.isedit = true;

  }
  deleteService(id: number) {
    if (confirm('¿Estas seguro de eliminar el servicio?')) {
      this.servicioSer.deleteService(id).subscribe(res => {
        alert('Servicio eliminado');
        this.get_services();
      },
        err => {
          console.log(err);
        });
    }
  }
}
