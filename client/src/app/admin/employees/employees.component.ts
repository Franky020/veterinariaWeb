import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

//services

//material elements
import { MatCardModule } from '@angular/material/card';
import {MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { EmployeeService } from '../../services/employee.service';

interface Type{
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [MatCardModule, MatPaginatorModule,MatPaginator, MatTableModule, MatFormFieldModule, CommonModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {
  displayedColumns: string[]= ['name','lastName','phone','type','image','email','action'];
  dataSource: any;
  editData: any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  isadd=false;
  isedit=false;
  hide = true;

  employees: any;

  employee = {
    id: 0,
    user:'',
    name: '',
    lastName: '',
    phone: '',
    type: '',
    image: '',
    email: '',
    password: ''
  }
  image : any;

  //select components
  types: Type[] = [
    {value: 'admin', viewValue: 'Admin'},
    {value: 'vet', viewValue: 'Veterinario'},
    {value: 'assistant', viewValue: 'Asistente'},
    {value: 'receptionist', viewValue: 'Recepcionista'}
  ];
  constructor(private servicioEmp: EmployeeService, private builder: FormBuilder) { }
  ngOnInit(): void {
    this.get_employees();
  }

  get_employees(){
    //get employees from service
    this.servicioEmp.getEmployees().subscribe(res => {
        this.employees = res;
        this.dataSource = new MatTableDataSource(this.employees.employees);
        this.dataSource.paginator = this.paginator;
      }
    );

  }

  employeeForm = this.builder.group({
    id: this.builder.control({ value: 0, disabled: true }),
    user: this.builder.control({ value: 0, disabled: true }),
    name: this.builder.control('', Validators.required),
    lastName: this.builder.control('', Validators.required),
    phone: this.builder.control('', Validators.required),
    type: this.builder.control('', Validators.required),
    image: this.builder.control(''),
    email: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  }
  );
  addEmployee(){
    this.isadd = true;

  }

  backtolist(){
    this.isadd = false;
    this.isedit = false;
  }

  saveEmployee(){
    if(this.employeeForm.valid){
      this.servicioEmp.addEmployee(
        this.employee.name,
        this.employee.lastName,
        this.employee.phone,
        this.employee.type,
        this.employee.email,
        this.employee.password,
        this.image
      ).subscribe(res => {
        alert('Empleado agregado');
        this.isadd = false;
        this.get_employees();
      },
      error => {
        alert('Error al agregar empleado');
      });
    }
  }

}
