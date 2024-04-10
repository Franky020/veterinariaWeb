import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

//services
import { ConsultationService } from '../../services/consultation.service';

//material elements
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-consultations',
  standalone: true,
  imports: [MatCardModule, MatPaginatorModule, MatPaginator, MatTableModule, MatFormFieldModule, CommonModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatInputModule, MatSelectModule],
  templateUrl: './consultations.component.html',
  styleUrl: './consultations.component.css'
})
export class ConsultationsComponent {
  displayedColumns: string[] = ['petName','specie','vetId', 'diagnosis', 'observations', 'signs', 'treatment', 'date', 'action'];
  dataSource: any;
  editData: any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  consults: any;
  consult = {
    id:'',
    petId: '',
    vetId: localStorage.getItem('idVet') || '',
    nameVet: localStorage.getItem('nameVet') || '',
    lastNameVet: localStorage.getItem('vetLastName'),
    diagnosis: '',
    observations: '',
    signs: '',
    treatment: '',
    petName: ''
  }
  isedit = false; 

  constructor(private servicioCons: ConsultationService, private builder: FormBuilder) { }

  ngOnInit(): void {
    this.get_consultations();
  }

  // get_consultations() {
  //   this.servicioCons.getConsults().subscribe(res => {
  //     this.consults = res;
  //     this.dataSource = new MatTableDataSource(this.consults.consults);
  //     this.dataSource.paginator = this.paginator;
  //     console.log(this.consults);
  //   });
  // }

  get_consultations() {
    this.servicioCons.getConsults().subscribe(res => {
      const resConsults = res.consults;
      // console.log(resConsults);
      const consultsDataSource = resConsults.map((consult: any) => {
        const { _id, petId, vetId, diagnosis, observations, signs, treatment, date } = consult;
        return {
          _id: _id,
          petId: petId._id,
          specie: petId.specie,
          petName: petId.details.name,
          vetId: vetId._id,
          vetName: vetId.name,
          vetlastname: vetId.lastName,
          diagnosis: diagnosis,
          observations: observations,
          signs: signs,
          treatment: treatment,
          date: date
        };
      });
      this.dataSource = new MatTableDataSource(consultsDataSource);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    debugger;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //consultation edit
  consultForm = this.builder.group({
    id: this.builder.control({ value: 0, disabled: true }),
    petId: this.builder.control({ value: 0, disabled: true }),
    vetId: this.builder.control({ value: 0, disabled: true }),
    nameVet: this.builder.control('', Validators.required),
    diagnosis: this.builder.control('', Validators.required),
    observations: this.builder.control(''),
    signs: this.builder.control(''),
    treatment: this.builder.control(''),
    petName: this.builder.control('')
  });

  showConsulta(id: string) {
    this.servicioCons.getConsult(id).subscribe(res => {
      console.log(res);
      this.editData = res;

      this.consultForm.setValue({
        id: this.editData.consult._id,
        petId: this.editData.consult.petId._id,
        vetId: this.editData.consult.vetId._id,
        nameVet: this.editData.consult.vetId.name,
        diagnosis: this.editData.consult.diagnosis,
        observations: this.editData.consult.observations,
        signs: this.editData.consult.signs,
        treatment: this.editData.consult.treatment,
        petName: this.editData.consult.petId.details.name
      });
    });
    this.isedit = true;
  }
  saveEditConsult() {
    debugger;
    this.servicioCons.editConsult(
      this.consult.id,
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

  backtolist() {
    this.isedit = false;
    this.get_consultations();
  }
}
