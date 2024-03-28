import { Component, ViewChild } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

//services
import { OwnerService } from '../../services/owner.service';

//material elements
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';



interface Specie {
  value: string;
  viewValue: string;
}

interface Gender {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-owners',
  standalone: true,
  imports: [MatCardModule, MatPaginatorModule, MatPaginator, MatTableModule, MatFormFieldModule, CommonModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatInputModule, RouterModule],
  templateUrl: './owners.component.html',
  styleUrl: './owners.component.css'
})
export class OwnersComponent {
  displayedColumns: string[] = ['petBtn', 'id', 'name', 'lastName', 'phone', 'email', 'image', 'action'];
  dataSource: any;
  editData: any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  isadd = false;
  isedit = false;
  isaddPet = false;

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
  image: any;

  pets: any;

  pet = {
    id: '',
    name: '',
    age: 0,
    health: '',
    gender: '',
    weight: 0,
    specie: '',
    owner: '',
    imageP: ''
  }

  imageP: any;

  //select components
  species: Specie[] = [
    { value: 'Felines', viewValue: 'Gatos' },
    { value: 'Canines', viewValue: 'Perros' },
    { value: 'Rodents', viewValue: 'Roedores' },
    { value: 'Birds', viewValue: 'Aves' }
  ];

  genders: Gender[] = [
    { value: 'Male', viewValue: 'Macho' },
    { value: 'Female', viewValue: 'Hembra' }
  ];


  constructor(private servicioOwn: OwnerService, private builder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.get_owners();
  }

  get_owners() {
    //get owners from the api
    this.servicioOwn.getOwners().subscribe(res => {
      //debugger;
      this.owners = res;
      this.dataSource = new MatTableDataSource(this.owners.owners);
      this.dataSource.paginator = this.paginator;
    });
  }

  ownerForm = this.builder.group({
    id: this.builder.control({ value: 0, disabled: true }),
    name: this.builder.control('', Validators.required),
    lastName: this.builder.control('', Validators.required),
    phone: this.builder.control('', Validators.required),
    image: this.builder.control(''),
    email: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  });

  addOwner() {
    this.isadd = true;
  }

  backtolist() {
    this.isadd = false;
    this.isedit = false;
    this.isaddPet = false;
    this.get_owners();
    this.ownerForm.reset();
    this.petsForm.reset();
  }

  saveOwner() {
    this.servicioOwn.addOwner(
      this.owner.name,
      this.owner.lastName,
      this.owner.phone,
      this.owner.email,
      this.owner.password,
      this.image
    ).subscribe(res => {
      alert('Dueño agregado');
      this.get_owners();
      this.isadd = false;
    }, err => {
      alert('Error al agregar dueño');
    }
    );
  }

  fotoSeleccionada1(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.image = <File>event.target.files[0];
    }
  }

  ///edit
  ownerEditForm = this.builder.group({
    id: this.builder.control({ value: 0, disabled: true }),
    name: this.builder.control('', Validators.required),
    lastName: this.builder.control('', Validators.required),
    phone: this.builder.control('', Validators.required),
    image: this.builder.control(''),
  });

  showOwnerEdit(id: number) {
    this.servicioOwn.getOwner(id).subscribe(res => {
      this.editData = res;
      this.owner.image = res.owner.image;
      this.ownerEditForm.setValue({
        id: this.editData.owner._id,
        name: this.editData.owner.name,
        lastName: this.editData.owner.lastName,
        phone: this.editData.owner.phone,
        image: this.editData.owner.image
      });
    });
    this.isedit = true;
  }

  editOwner() {
    debugger;
    this.servicioOwn.editOwner(
      this.owner.id,
      this.owner.name,
      this.owner.lastName,
      this.owner.phone,
      this.image
    ).subscribe(res => {
      alert('Dueño editado');
      this.backtolist();
    }, err => {
      alert('Error al editar dueño');
    });
  }

  //delete
  deleteOwner(id: number) {
    if (confirm('Estas seguro de eliminar este dueño?')) {
      this.servicioOwn.deleteOwner(id).subscribe(res => {
        alert('Dueño eliminado');
        this.get_owners();
      }, err => {
        alert('Error al eliminar dueño');
      });
    }
  }

  // detailsOwner(id: number) {
  //   this.router.navigate(['/admin/owners/details', id]);
  // }

  detailsOwnerE(id: number) {
    localStorage.setItem('ownerId', id.toString());
    this.router.navigate(['/admin/owners/details']);
  }

  //////////////////////////////////////////////
  //Pets
  petsForm = this.builder.group({
    id: this.builder.control({ value: 0, disabled: true }),
    name: this.builder.control('', Validators.required),
    age: this.builder.control('', Validators.required),
    health: this.builder.control('', Validators.required),
    gender: this.builder.control('', Validators.required),
    weight: this.builder.control('', Validators.required),
    specie: this.builder.control('', Validators.required),
    owner: this.builder.control({ value: 0, disabled: true }),
    imageP: this.builder.control(''),

  });

  showPetForm(ownerId: string) {
    this.isaddPet = true;
    this.pet.owner = ownerId;
    
  }

  savePet() {
    this.servicioOwn.addPet(
      this.pet.id,
      this.pet.name,
      this.pet.age,
      this.pet.health,
      this.pet.gender,
      this.pet.weight,
      this.pet.specie,
      this.pet.owner,
      this.imageP
    ).subscribe(res => {
      alert('Mascota agregada');
      this.backtolist();
      this.isadd = false;
    }, err => {
      alert('Error al agregar la mascota');
    });
  
  }
}
