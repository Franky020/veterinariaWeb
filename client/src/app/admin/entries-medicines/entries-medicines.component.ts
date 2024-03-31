import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

//services
import { MedicineEntriesService } from '../../services/medicine-entries.service';

//material elemments
import { MatCardModule } from '@angular/material/card';
import {MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

interface Medication {
  _id: string;
  medication: string;
}

@Component({
  selector: 'app-entries-medicines',
  standalone: true,
  imports: [MatCardModule, MatPaginatorModule,MatPaginator, MatTableModule, MatFormFieldModule, CommonModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './entries-medicines.component.html',
  styleUrl: './entries-medicines.component.css'
})
export class EntriesMedicinesComponent {
  displayedColumns: string[] = ['id', 'medication', 'price','quantity', 'total', 'date'];
  
  dataSource: any;
  editData: any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  isadd = false;
  isedit = false;

  entriesMed: any;

  entryMed ={
    id: 0,
    medication: 0,
    price: 0,
    quantity: 0,
 
  }

  medications: Medication[] = [];
  

  constructor(private servicioMedEnt: MedicineEntriesService  ,private builder: FormBuilder){}

  ngOnInit(){
    this.get_entriesMed();
    this.getMedications();
  }

  get_entriesMed(){
    this.servicioMedEnt.getMedicineEntries().subscribe(res=>{
      debugger;
      this.entriesMed = res;
      this.dataSource = new MatTableDataSource(this.entriesMed.entries);
      this.dataSource.paginator = this.paginator;
    })
  }

  medicationsForm = this.builder.group({
    id: this.builder.control({value:0, disabled:true}),
    medication: this.builder.control('', Validators.required),
    price: this.builder.control('', Validators.required),
    quantity: this.builder.control('', Validators.required)
  });

  addMedication(){
    this.isadd=true;
  }

  backtolist(){
    this.isadd=false;
    this.get_entriesMed();
  }

  saveEntryMed(){
    this.servicioMedEnt.addMedicineEntry(
      this.entryMed.medication,
      this.entryMed.price,
      this.entryMed.quantity
    ).subscribe(res=>{
      this.get_entriesMed();
      this.isadd=false;
      alert('Entrada agregada');
    },
    error=>{
      alert('Error al agregar la entrada');
    });
  }

  getMedications(){
    this.servicioMedEnt.getMedications().subscribe(res=>{
      this.medications = res.medicines;
      console.log(this.medications);
    });
  }
}
