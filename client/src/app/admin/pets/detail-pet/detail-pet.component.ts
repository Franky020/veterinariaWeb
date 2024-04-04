import { Component, ViewChild } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

//services
import { PetService } from '../../../services/pet.service';
import { ConsultationService } from '../../../services/consultation.service';
import { MedicalHistoryService } from '../../../services/medical-history.service';

//material elements
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';




@Component({
  selector: 'app-detail-pet',
  standalone: true,
  imports: [MatTabsModule, MatCardModule, MatPaginatorModule, MatPaginator, MatTableModule, MatFormFieldModule, CommonModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatInputModule, RouterModule],
  templateUrl: './detail-pet.component.html',
  styleUrl: './detail-pet.component.css'
})
export class DetailPetComponent {

  displayedColumnsCon: string[] = ['vetId', 'diagnosis', 'observations', 'signs', 'treatment', 'date'];
  displayedColumnsVac: string[] = ['vaccineName', 'dateAdministered', 'veterinarian'];
  displayedColumnsDes: string[] = ['desparacitador', 'dateDes', 'veterinarianDes'];
  displayedColumnsCir: string[] = ['cirugia', 'dateCir','veterinarianCir'];
  displayedColumnsMed: string[] = ['medicacion', 'dateMed','veterinarianMed'];
  displayedColumnsExM: string[] = ['examenes', 'dateExM','veterinarianExM'];

  @ViewChild(MatPaginator) paginatorCon !: MatPaginator;
  @ViewChild(MatPaginator) paginatorVac !: MatPaginator;
  @ViewChild(MatPaginator) paginatorDes !: MatPaginator;
  @ViewChild(MatPaginator) paginatorCir !: MatPaginator;
  @ViewChild(MatPaginator) paginatorMed !: MatPaginator;
  @ViewChild(MatPaginator) paginatorExM !: MatPaginator;


  dataSourceCon: any;
  dataSourceVac: any;
  dataSourceDes: any;
  dataSourceCir: any;
  dataSourceMed: any;
  dataSourceExM: any;

  isadd = false;
  medicalHistoryCategories: any[] = [];


  owners: any;
  petData: any;

  pets: any;
  pet: any;

  consults: any;
  histories: any;

  petE = {
    id: '',
    name: '',
    age: 0,
    breed: '',
    health: '',
    gender: '',
    weight: 0,
    specie: '',
    owner: '',
    imageP: ''
  }

  imageP: any;

  


  constructor(private servicioPet: PetService, private servicioCons: ConsultationService, private servicioMedH: MedicalHistoryService, private router: Router, private builder: FormBuilder) { }

  ngOnInit(): void {
    this.get_petData();
    this.get_consults();
    this.get_historyVac();
    this.get_historyDes();
    this.get_historyCir();
    this.get_historyMed();
    this.get_historyExM();
    
  }

  get_petData() {
    let petId = localStorage.getItem("petId");
    if (petId != null) {
      this.servicioPet.getPet(petId).subscribe(res => {
        this.petData = res;
        // console.log(this.petData);
        this.pet = this.petData.pet;
      },
        err => {
          console.log(err);
        });
    }

  }

  showOwner(ownerId: any) {
    localStorage.setItem("ownerId", ownerId);
    this.router.navigate(['/admin/owners/details']);
  }

  get_consults() {
    let petId = localStorage.getItem("petId");
    if (petId != null) {
      this.servicioCons.getConsultPet(petId).subscribe(res => {
        this.consults = res;
        this.dataSourceCon = new MatTableDataSource(this.consults.consults);
        this.dataSourceCon.paginator = this.paginatorCon;
        // console.log(this.consults);
      },
        err => {
          console.log(err);
      });

    }
  }

  get_historyVac(){
    let petId = localStorage.getItem("petId");
    if (petId != null) {
      this.servicioMedH.getMedicalHistoryPet(petId).subscribe(res => {
        this.histories = res.histories;

        this.medicalHistoryCategories = this.histories.filter((history: any) => history.category === 'vacunacion');
        this.dataSourceVac = new MatTableDataSource(this.medicalHistoryCategories);
        this.dataSourceVac.paginator = this.paginatorVac;
      },
        err => {
          console.log(err);
      });

    }
  }

  get_historyDes(){
    let petId = localStorage.getItem("petId");
    if (petId != null) {
      this.servicioMedH.getMedicalHistoryPet(petId).subscribe(res => {
        this.histories = res.histories;

        this.medicalHistoryCategories = this.histories.filter((history: any) => history.category === 'Desparasitacion');
        this.dataSourceDes = new MatTableDataSource(this.medicalHistoryCategories);
        this.dataSourceDes.paginator = this.paginatorDes;
        console.log(this.medicalHistoryCategories);
      },
        err => {
          console.log(err);
      });

    }
  }
  get_historyCir(){
    let petId = localStorage.getItem("petId");
    if (petId != null) {
      this.servicioMedH.getMedicalHistoryPet(petId).subscribe(res => {
        this.histories = res.histories;

        this.medicalHistoryCategories = this.histories.filter((history: any) => history.category === 'Cirugias');
        this.dataSourceCir = new MatTableDataSource(this.medicalHistoryCategories);
        this.dataSourceCir.paginator = this.paginatorCir;
      },
        err => {
          console.log(err);
      });
    }
  }

  get_historyMed(){
    let petId = localStorage.getItem("petId");
    if (petId != null) {
      this.servicioMedH.getMedicalHistoryPet(petId).subscribe(res => {
        this.histories = res.histories;

        this.medicalHistoryCategories = this.histories.filter((history: any) => history.category === 'Medicacion');
        this.dataSourceMed = new MatTableDataSource(this.medicalHistoryCategories);
        this.dataSourceMed.paginator = this.paginatorMed;
      },
        err => {
          console.log(err);
      });
    }
  }

  get_historyExM(){
    let petId = localStorage.getItem("petId");
    if (petId != null) {
      this.servicioMedH.getMedicalHistoryPet(petId).subscribe(res => {
        this.histories = res.histories;

        this.medicalHistoryCategories = this.histories.filter((history: any) => history.category === 'Examen_Medico');
        this.dataSourceExM = new MatTableDataSource(this.medicalHistoryCategories);
        this.dataSourceExM.paginator = this.paginatorExM;
      },
        err => {
          console.log(err);
      });

    }
  }


  }
