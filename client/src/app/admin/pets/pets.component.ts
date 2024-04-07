import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

//services
import { PetService } from '../../services/pet.service';
import { ConsultationService } from '../../services/consultation.service';
import { MedicalHistoryService } from '../../services/medical-history.service';

//material elements
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import {MatSort, MatSortModule} from '@angular/material/sort';





interface Specie {
  value: string;
  viewValue: string;
}

interface Gender {
  value: string;
  viewValue: string;
}
interface Health {
  value: string;
  viewValue: string;
}

interface Category {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-pets',
  standalone: true,
  imports: [MatCardModule, MatPaginatorModule, MatPaginator, MatTableModule, MatFormFieldModule, CommonModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatInputModule, RouterModule, MatExpansionModule, MatSelectModule, MatSortModule],
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.css'
})
export class PetsComponent {
  displayedColumns: string[] = ['consult', 'name', 'age', 'health', 'gender', 'weight', 'specie', 'owner', 'image', 'action'];
  dataSource: any;
  editData: any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort = new MatSort();


  isadd = false;
  isedit = false;
  isconsult = false;

  pets: any;

  pet = {
    id: '',
    name: '',
    age: 0,
    health: '',
    breed: '',
    gender: '',
    weight: 0,
    specie: '',
    owner: '',
    image: '',
    ownerName: '',
    ownerLastName: ''
  }
  image: any;

  consult = {
    petId: '',
    vetId: localStorage.getItem('idVet') || '',
    nameVet: localStorage.getItem('nameVet') || '',
    lastNameVet: localStorage.getItem('vetLastName'),
    diagnosis: '',
    observations: '',
    signs: '',
    treatment: ''
  }

  history = {
    petId: '',
    vetId: localStorage.getItem('idVet') || '',
    description: '',
    category: ''
  }

  //select components
  species: Specie[] = [
    { value: 'Felino', viewValue: 'Gato' },
    { value: 'Canino', viewValue: 'Perro' },
    { value: 'Roedor', viewValue: 'Roedor' },
    { value: 'Ave', viewValue: 'Ave' }
  ];

  genders: Gender[] = [
    { value: 'Macho', viewValue: 'Macho' },
    { value: 'Hembra', viewValue: 'Hembra' }
  ];

  healths: Health[] = [
    { value: 'Bueno', viewValue: 'Bueno' },
    { value: 'Malo', viewValue: 'Malo' },
    { value: 'Regular', viewValue: 'Regular' },
    { value: 'Excelente', viewValue: 'Excelente' }
  ];

  categories: Category[] = [
    { value: 'vacunacion', viewValue: 'Vacunación' },
    { value: 'Desparasitacion', viewValue: 'Desparasitación' },
    { value: 'Cirugias', viewValue: 'Cirugías' },
    { value: 'Medicacion', viewValue: 'Medicación' },
    { value: 'Examen_Medico', viewValue: 'Exámen Médico' }
  ];


  constructor(private servicioPet: PetService, private servicioCons: ConsultationService, private servicioHis: MedicalHistoryService,  private builder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.get_pets();
    this.dataSource.sort = this.sort;

  }

  applyFilter(event: Event) {
    debugger;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  get_pets() {
    //get pets from the api
    this.servicioPet.getPets().subscribe(res => {
      // console.log(res);
      debugger;
      const resPets = res.pets;

      const petsDataSource = resPets.map((pet: any) => {
        const { _id, details, specie, owner } = pet;
        return {
          _id: _id,
          name: details.name,
          age: details.age,
          health: details.health,
          breed: details.breed,
          gender: details.gender,
          weight: details.weight,
          specie: specie,
          owner: owner._id,
          image: details.image,
          ownerName: owner.name,
          ownerLastName: owner.lastName
        };
      });

      this.dataSource = new MatTableDataSource(petsDataSource);
      this.dataSource.paginator = this.paginator;
    });
    // console.log(localStorage.getItem('idVet'));

  }

  detailsPet(id: string) {
    debugger;
    localStorage.setItem('petId', id);
    this.router.navigate(['/admin/pets/details']);
  }

  petsForm = this.builder.group({
    id: this.builder.control({ value: 0, disabled: true }),
    name: this.builder.control('', Validators.required),
    age: this.builder.control('', Validators.required),
    breed: this.builder.control('', Validators.required),
    health: this.builder.control('', Validators.required),
    gender: this.builder.control('', Validators.required),
    weight: this.builder.control('', Validators.required),
    specie: this.builder.control('', Validators.required),
    owner: this.builder.control(''),
    image: this.builder.control('')

  });

  showPetForm(id: string) {
    this.servicioPet.getPet(id).subscribe(res => {
      this.editData = res;
      this.pet.image = res.pet.details.image;
      this.petsForm.setValue({
        id: this.editData.pet._id,
        name: this.editData.pet.details.name,
        age: this.editData.pet.details.age,
        breed: this.editData.pet.details.breed,
        health: this.editData.pet.details.health,
        gender: this.editData.pet.details.gender,
        weight: this.editData.pet.details.weight,
        specie: this.editData.pet.specie,
        owner: this.editData.pet.owner._id,
        image: this.editData.pet.details.image
      });
    });
    this.isedit = true;
  }

  editPet() {
    debugger;
    this.servicioPet.editPet(
      this.pet.id,
      this.pet.name,
      this.pet.breed,
      this.pet.age,
      this.pet.health,
      this.pet.gender,
      this.pet.weight,
      this.pet.specie,
      this.pet.owner,
      this.image
    ).subscribe(res => {
      alert('Mascota actualizada');
      this.backtolist();
      this.isadd = false;
    }, err => {
      alert('Error al actualizar la mascota');
    });

  }
  backtolist() {
    this.isadd = false;
    this.isedit = false;
    this.isconsult = false;
    this.get_pets();
  }

  fotoSeleccionadaP(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.image = <File>event.target.files[0];
    }
  }

  deletePet(id: string) {
    if (confirm('¿Está seguro de eliminar la mascota?')) {
      this.servicioPet.deletePet(id).subscribe(res => {
        alert('Mascota eliminada');
        this.get_pets();
      }, err => {
        alert('Error al eliminar la mascota');
      });
    }

  }


  /////Consultation

  show_consultForm(id: string) {
    this.servicioPet.getPet(id).subscribe(res => {
      this.editData = res;
      this.consult.petId = this.editData.pet._id;
      this.pet.name = this.editData.pet.details.name;
      this.pet.ownerName = this.editData.pet.owner.name;
      this.pet.ownerLastName = this.editData.pet.owner.lastName;
      this.consult.lastNameVet = localStorage.getItem('vetLastName');
      console.log(this.editData);
    });
    this.isconsult = true;
  }

  consultForm = this.builder.group({
    petId: this.builder.control({ value: 0, disabled: true }),
    vetId: this.builder.control({ value: 0, disabled: true }),
    nameVet: this.builder.control('', Validators.required),
    diagnosis: this.builder.control('', Validators.required),
    observations: this.builder.control(''),
    signs: this.builder.control(''),
    treatment: this.builder.control(''),
  });

  saveConsult() {
    debugger;
    this.servicioCons.addConsult(
      this.consult.petId,
      this.consult.vetId,
      this.consult.nameVet,
      this.consult.diagnosis,
      this.consult.observations,
      this.consult.signs,
      this.consult.treatment
      
    ).subscribe(res => {
      alert('Consulta guardada');
      this.backtolist();
    }, err => {
      alert('Error al guardar la consulta');
    });
  }


  /////Medical History
  historyForm = this.builder.group({
    petId: this.builder.control({ value: 0, disabled: true }),
    vetId: this.builder.control({ value: 0, disabled: true }),
    description: this.builder.control(''),
    category: this.builder.control('')
  });

  saveHistory() {
    debugger;
    this.servicioHis.addMedicalHistory(
      this.consult.petId,
      this.consult.vetId,
      this.history.description,
      this.history.category
    ).subscribe(res => {
      alert('Historial guardado');
      this.historyForm.reset();

    }, err => {
      alert('Error al guardar el historial');

    });
  }
}
