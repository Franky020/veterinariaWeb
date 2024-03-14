import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

//services

//material elemments
import { MatCardModule } from '@angular/material/card';
import {MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

interface Category{
  value: string;
  viewValue: string;
}
interface Specie{
  value: string;
  viewValue: string;
}
interface DosageForm{
  value: string;
  viewValue: string;
}
interface AdministrationRoute{
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-entries-medicines',
  standalone: true,
  imports: [MatCardModule, MatPaginatorModule,MatPaginator, MatTableModule, MatFormFieldModule, CommonModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './entries-medicines.component.html',
  styleUrl: './entries-medicines.component.css'
})
export class EntriesMedicinesComponent {
  displayedColumns: string[] = ['id', 'medication', 'description','details','dosageForm','dosage','administrationRoute','precautions','dateExpiry','species','category', 'price','quantity', 'image'];
  dataSource: any;
  editData: any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  isadd = false;
  isedit = false;

  medications: any;

  medication ={
    id: 0,
    medication: '',
    description: '',
    details: '',
    dosageForm: '',
    dosage: '',
    administrationRoute: '',
    precautions: '',
    dateExpiry: '',
    species: '',
    category: '',
    price: 0,
    quantity: 0,
    image: ''
  }

  //select components
  categories: Category[] = [
    {value: 'Antibiotic', viewValue: 'Antibiótico'},
    {value: 'Analgesic', viewValue: 'Analgésico'},
    {value: 'Anti-inflammatory', viewValue: 'Anti-Inflamatorio'},
    {value: 'Antiparasitic', viewValue: 'Antiparasitario'},
    {value: 'Antiviral', viewValue: 'Antiviral'},
    {value: 'Other', viewValue: 'Otro'}
  ];
  species: Specie[] = [
    {value: 'Feline', viewValue: 'Gato'},
    {value: 'Perro', viewValue: 'Perro'},
    {value: 'Rodeant', viewValue: 'Roedor'},
    {value: 'Bird', viewValue: 'Aves'}
  ];
  dosageForms: DosageForm[] = [
    {value: 'Tablet', viewValue: 'Tableta'},
    {value: 'Capsule', viewValue: 'Cápsula'},
    {value: 'Liquid', viewValue: 'Líquido'},
    {value: 'Injection', viewValue: 'Inyección'},
    {value: 'Topical', viewValue: 'Tópico'},
    {value: 'Drops', viewValue: 'Gotas'},
    {value: 'Powder', viewValue: 'Polvo'},
    {value: 'Suspensión', viewValue: 'Suspensión'},
    {value: 'Ointment', viewValue: 'Pomada'},
    {value: 'Gel', viewValue: 'Gel'}
  ];
  administrationRoutes: AdministrationRoute[] = [
    {value: 'Oral', viewValue: 'Oral'},
    {value: 'Intravenous', viewValue: 'Intravenosa'},
    {value: 'Intramuscular', viewValue: 'Intramuscular'},
    {value: 'Subcutanea', viewValue: 'Subcutánea'},
    {value: 'Topical', viewValue: 'Tópico'},
    {value: 'Rectal', viewValue: 'Rectal'},
    {value: 'Ophthalmic', viewValue: 'Oftálmica'},
    {value: 'Otic', viewValue: 'Ótica'}
  ];

  constructor(private builder: FormBuilder){}

  ngOnInit(){
    this.get_medications();
  }

  get_medications(){
    this.medications = [
      {id: 1, medication: 'Paracetamol', description: 'Medicamento para el dolor', details: 'Medicamento para el dolor', dosageForm: 'Tabletas', dosage: '500mg', administrationRoute: 'Oral', precautions: 'No exceder la dosis', dateExpiry: '2023-12-31', species: 'Humano', category: 'Analgésico', price: 50, quantity: 100, image: 'paracetamol.jpg'},
      {id: 2, medication: 'Ivermectina', description: 'Medicamento para desparasitar', details: 'Medicamento para desparasitar', dosageForm: 'Tabletas', dosage: '6mg', administrationRoute: 'Oral', precautions: 'No exceder la dosis', dateExpiry: '2023-12-31', species: 'Humano', category: 'Antiparasitario', price: 100, quantity: 50, image: 'ivermectina.jpg'},
    ]
    this.dataSource = new MatTableDataSource(this.medications);
    this.dataSource.paginator = this.paginator;

  }

  medicationsForm = this.builder.group({
    id: this.builder.control({value:0, disabled:true}),
    medication: this.builder.control('', Validators.required),
    description: this.builder.control('', Validators.required),
    details: this.builder.control('', Validators.required),
    dosageForm: this.builder.control('', Validators.required),
    dosage: this.builder.control('', Validators.required),
    administrationRoute: this.builder.control('', Validators.required),
    precautions: this.builder.control('', Validators.required),
    dateExpiry: this.builder.control('', Validators.required),
    species: this.builder.control('', Validators.required),
    category: this.builder.control('', Validators.required),
    price: this.builder.control('', Validators.required),
    quantity: this.builder.control('', Validators.required),
    image: this.builder.control(''),
  })

  addMedication(){
    this.isadd=true;
  }

  backtolist(){
    this.isadd=false;
    this.get_medications;
  }
}
