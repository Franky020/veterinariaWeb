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
import { RouterModule } from '@angular/router';
import { PetService } from '../../services/pet.service';

@Component({
  selector: 'app-pets',
  standalone: true,
  imports: [MatCardModule, MatPaginatorModule,MatPaginator, MatTableModule, MatFormFieldModule, CommonModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatInputModule, RouterModule],
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.css'
})
export class PetsComponent {
  displayedColumns: string[] = ['id','name','age','health','gender','weight','specie','owner','image', 'action'];
  dataSource: any;
  editData: any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  isadd=false;
  isedit=false;

  pets: any;

  pet = {
    id: 0,
    name:'',
    age: 0,
    health: '',
    gender: '',
    weight: 0,
    specie: '',
    owner: '',
    image: ''
  }
  image : any;


  constructor(private servicioPet: PetService, private builder: FormBuilder) { }

  ngOnInit(): void {
    this.get_pets();
  }

  get_pets(){
    //get pets from the api
    this.servicioPet.getPets().subscribe(res=>{
      debugger;
      this.pets = res;
      this.dataSource = new MatTableDataSource(this.pets.pets);
      this.dataSource.paginator = this.paginator;
    });

  }

  

}
