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
import { MedicineService } from '../../services/medicine.service';
import { MatSelectModule } from '@angular/material/select';


interface Category {
  value: string;
  viewValue: string;
}
interface Specie {
  value: string;
  viewValue: string;
}
interface DosageForm {
  value: string;
  viewValue: string;
}
interface AdminRoute {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-medicines',
  standalone: true,
  imports: [MatCardModule, MatPaginatorModule, MatPaginator, MatTableModule, MatFormFieldModule, CommonModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatInputModule, MatSelectModule],
  templateUrl: './medicines.component.html',
  styleUrl: './medicines.component.css'
})
export class MedicinesComponent {
  displayedColumns: string[] = ['medication', 'description', 'dosageForm', 'dosage', 'administrationRoute', 'precautions', 'dateExpiry', 'species', 'category', 'price', 'quantity', 'image', 'action'];
  dataSource: any;
  editData: any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  isadd = false;
  isedit = false;

  medications: any;

  medication = {
    id: 0,
    medication: '',
    description: '',
    dosageForm: '',
    dosage: '',
    administrationRoute: '',
    precautions: '',
    dateExpiry: '',
    species: [],
    category: '',
    price: '',
    quantity: '',
    image: ''
  }
  image: any;

  //select components
  categories: Category[] = [
    { value: 'Antibiótico', viewValue: 'Antibiótico' },
    { value: 'Analgésico', viewValue: 'Analgésico' },
    { value: 'Antiinflamatorio', viewValue: 'Anti-Inflamatorio' },
    { value: 'Antiparasitario', viewValue: 'Antiparasitario' },
    { value: 'Antifúngico', viewValue: 'Anti-hongos' },
    { value: 'Antiviral', viewValue: 'Antiviral' },
    { value: 'Otro', viewValue: 'Otro' }
  ];
  species: Specie[] = [
    { value: 'Felinos', viewValue: 'Gato' },
    { value: 'Caninos', viewValue: 'Perro' },
    { value: 'Roedores', viewValue: 'Roedor' },
    { value: 'Aves', viewValue: 'Aves' }
  ];
  dosageForms: DosageForm[] = [
    { value: 'Tableta', viewValue: 'Tableta' },
    { value: 'Cápsula', viewValue: 'Cápsula' },
    { value: 'Líquido', viewValue: 'Líquido' },
    { value: 'Inyección', viewValue: 'Inyección' },
    { value: 'Tópico', viewValue: 'Tópico' },
    { value: 'Gotas', viewValue: 'Gotas' },
    { value: 'Polvo', viewValue: 'Polvo' },
    { value: 'Suspensión', viewValue: 'Suspensión' },
    { value: 'Ungüento', viewValue: 'Pomada' },
    { value: 'Gel', viewValue: 'Gel' }
  ];
  adminRoutes: AdminRoute[] = [
    { value: 'Oral', viewValue: 'Oral' },
    { value: 'Intravenoso', viewValue: 'Intravenosa' },
    { value: 'Intramuscular', viewValue: 'Intramuscular' },
    { value: 'Subcutáneo', viewValue: 'Subcutánea' },
    { value: 'Tópico', viewValue: 'Tópico' },
    { value: 'Rectal', viewValue: 'Rectal' },
    { value: 'Oftálmico', viewValue: 'Oftálmica' },
    { value: 'Ótico', viewValue: 'Ótica' }
  ];

  constructor(private servicioMed: MedicineService, private builder: FormBuilder) { }

  ngOnInit() {
    this.get_medications();
  }

  get_medications() {
    this.servicioMed.getMedicines().subscribe(res => {
      //debugger;
      this.medications = res;
      this.dataSource = new MatTableDataSource(this.medications.medicines);
      this.dataSource.paginator = this.paginator;
    });
  }

  medicationsForm = this.builder.group({
    id: this.builder.control({ value: 0, disabled: true }),
    medication: this.builder.control('', Validators.required),
    description: this.builder.control('', Validators.required),
    dosageForm: this.builder.control(''),
    dosage: this.builder.control(''),
    administrationRoute: this.builder.control(''),
    precautions: this.builder.control(''),
    dateExpiry: this.builder.control(''),
    species: this.builder.control('', Validators.required),
    category: this.builder.control('', Validators.required),
    price: this.builder.control('', Validators.required),
    quantity: this.builder.control('', Validators.required),
    image: this.builder.control(''),
  })

  addMedication() {
    this.isadd = true;
  }

  backtolist() {
    this.isadd = false;
    this.isedit = false;
    this.get_medications;
    this.medicationsForm.reset();
  }

  saveMedication() {
    //debugger;
    if (this.medicationsForm.valid) {

      if (this.isadd) {
        this.servicioMed.addMedicine(
          this.medication.medication,
          this.medication.description,
          this.medication.dosageForm,
          this.medication.dosage,
          this.medication.precautions,
          this.medication.dateExpiry,
          this.medication.administrationRoute,
          this.medication.species,
          this.medication.category,
          this.medication.price,
          this.medication.quantity,
          this.image
        ).subscribe(res => {
          this.isadd = false;
          alert('Medicamento agregado');
          this.get_medications();
        },
          error => {
            console.log(error);
            alert('Error al agregar el medicamento');
          });
      } else {
        this.servicioMed.editMedicine(
          this.medication.id,
          this.medication.medication,
          this.medication.description,
          this.medication.dosageForm,
          this.medication.dosage,
          this.medication.precautions,
          this.medication.dateExpiry,
          this.medication.administrationRoute,
          this.medication.species,
          this.medication.category,
          this.medication.price,
          this.medication.quantity,
          this.image
        ).subscribe(res => {
          alert('Medicamento actualizado');
          this.backtolist();
        },
          error => {
            console.log(error);
            alert('Error al actualizar el medicamento');
          });
      }
    }
  }



  fotoSeleccionada1(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.image = <File>event.target.files[0];
    }
  }

  showMedicationEdit(id: number) {
    debugger;
    this.servicioMed.getMedicine(id).subscribe(res => {
      this.editData = res;
      this.medication.image = res.medicine.image;

      const date = new Date(this.editData.medicine.details.dateExpiry);
      const formattedDate = date.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });
      
      this.medicationsForm.setValue({
        id: this.editData.medicine._id,
        medication: this.editData.medicine.medication,
        description: this.editData.medicine.description,
        dosageForm: this.editData.medicine.details.dosageForm,
        dosage: this.editData.medicine.details.dosage,
        administrationRoute: this.editData.medicine.details.administrationRoute,
        precautions: this.editData.medicine.details.precautions,
        dateExpiry: formattedDate,
        species: this.editData.medicine.species,
        category: this.editData.medicine.category,
        price: this.editData.medicine.price,
        quantity: this.editData.medicine.quantity,
        image: this.editData.medicine.image
      });
    });
    this.isedit = true;
  }

  deleteMedication(id: number) {
    if (confirm('¿Estás seguro de eliminar el medicamento?')) {
      this.servicioMed.deleteMedicine(id).subscribe(res => {
        alert('Medicamento eliminado');
        this.get_medications();
      },
        error => {
          alert('Error al eliminar el medicamento');
        });
    }
  }

}
