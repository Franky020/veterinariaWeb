import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';


//services

//material elements
import { MatCardModule } from '@angular/material/card';
import {MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { OwnerService } from '../../../services/owner.service';

@Component({
  selector: 'app-detail-owner',
  standalone: true,
  imports: [MatCardModule, MatPaginatorModule,MatPaginator, MatTableModule, MatFormFieldModule, CommonModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatInputModule, RouterModule],
  templateUrl: './detail-owner.component.html',
  styleUrl: './detail-owner.component.css'
})
export class DetailOwnerComponent {

  ownerData: any;
  petData: any;

  owner = {
    id: '',
    name: '',
    lastName: '',
    phone: '',
    email: '',
    image: '',
    password: ''
  }
  image: any;


  pets : any;

  pet = {
    id: 0,
    name: '',
    age: 0,
    health: '',
    gender: '',
    weight: 0,
    specie: '',
    owner: '',
    imageP: ''
  }
  constructor(private activeRoute: ActivatedRoute, private servicioOwn: OwnerService, private router: Router) { }

  ngOnInit(): void {
    this.getOwnerData();
    this.getPetData();
  
  }

  getOwnerData(){
    // let ownerId = this.activeRoute.snapshot.paramMap.get('id');
    let ownerId = localStorage.getItem('ownerId');
    if (ownerId !== null) {
      this.servicioOwn.getOwnerD(ownerId).subscribe(
        res => {
          this.ownerData = res;
          console.log(this.ownerData);
          this.owner.id = this.ownerData.owner.id;
          this.owner.name = this.ownerData.owner.name;
          this.owner.lastName = this.ownerData.owner.lastName;
          this.owner.phone = this.ownerData.owner.phone;
          this.owner.email = this.ownerData.owner.email;
          this.owner.image = this.ownerData.owner.image;
        },
        err => console.error(err)
      );
    } else {
      console.error('Owner ID is null');
    }
  }

  getPetData(){
    let ownerId = localStorage.getItem('ownerId');
    if (ownerId !== null) {
      this.servicioOwn.getPetsOwner(ownerId).subscribe(
        res => {
          this.petData = res;
          console.log(this.petData);
          this.pets = this.petData.pets;

        },
        err => console.error(err)
      );
    } else {
      console.error('Owner ID is null');
    }
  }

  detailsPet(id: number) {
    localStorage.setItem('petId', id.toString());
    this.router.navigate(['/admin/pets/details']);
  }

}
