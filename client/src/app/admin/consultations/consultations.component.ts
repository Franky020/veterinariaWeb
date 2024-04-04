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
  displayedColumns: string[] = ['petId','vetId', 'diagnosis', 'observations', 'signs', 'treatment', 'date', 'action'];
  dataSource: any;
  editData: any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  consults: any;

  constructor(private servicioCons: ConsultationService) { }

  ngOnInit(): void {
    this.get_consultations();
  }

  get_consultations() {
    this.servicioCons.getConsults().subscribe(res => {
      this.consults = res;
      this.dataSource = new MatTableDataSource(this.consults.consults);
      this.dataSource.paginator = this.paginator;
      console.log(this.consults);
    });
  }
}
