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
  displayedColumns: string[]= ['id','user','name','lastName','phone','type','image','email','action'];
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
    type:'',
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
  constructor(private builder: FormBuilder) { }
  ngOnInit(): void {
    this.get_employees();
  }

  get_employees(){
    //get employees from service
    this.employees = [
    {id: 1, user: 'user1', name: 'name1', lastName: 'lastname1', phone: 'phone1', type: 'admin', image: 'image1', email: 'email1'},
    {id: 2, user: 'user2', name: 'name2', lastName: 'lastname2', phone: 'phone2', type: 'vet', image: 'image2', email: 'email2'}
    ]
    this.dataSource = new MatTableDataSource(this.employees);
    this.dataSource.paginator = this.paginator;

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

  get emailInput() { return this.employeeForm.get('email'); }
  get passwordInput() { return this.employeeForm.get('password'); } 

}
