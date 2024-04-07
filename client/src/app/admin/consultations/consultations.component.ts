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
  displayedColumns: string[] = ['petId','specie','vetId', 'diagnosis', 'observations', 'signs', 'treatment', 'date'];
  dataSource: any;
  editData: any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  consults: any;

  constructor(private servicioCons: ConsultationService) { }

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
      console.log(resConsults);
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
}
