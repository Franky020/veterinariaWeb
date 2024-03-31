import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

//services

//material elements
import { MatCardModule } from '@angular/material/card';
import {MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ProductEntriesService } from '../../services/product-entries.service';

interface Product {
  _id: string;
  product: string;
}

@Component({
  selector: 'app-entries-products',
  standalone: true,
  imports: [MatCardModule, MatPaginatorModule,MatPaginator, MatTableModule, MatFormFieldModule, CommonModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './entries-products.component.html',
  styleUrl: './entries-products.component.css'
})
export class EntriesProductsComponent {
  displayedColumns: string[] = ['id','product','price','quantity','total', 'date'];
  dataSource: any;
  editData: any;

  @ViewChild(MatPaginator) paginator !: MatPaginator;

  isadd=false;
  isedit=false;

 
  entries: any;

  entry= {
    id: 0,
    product:0,
    price: 0,
    quantity: ''

  }
 

 products: Product[]= [];

  constructor(private servicioProdEnt: ProductEntriesService, private builder: FormBuilder){}

  ngOnInit(): void{
    this.get_entries();
    this.getProducts();
  }

  get_entries(){
    this.servicioProdEnt.getProductEntries().subscribe(res=>{
      console.log(res);
      this.entries= res;
      this.dataSource = new MatTableDataSource(this.entries.entries);
      this.dataSource.paginator = this.paginator;
    });
  }

  entriesForm = this.builder.group({
    id: this.builder.control({ value: 0, disabled: true }),
    product: this.builder.control('', Validators.required),
    price: this.builder.control('', Validators.required),
    quantity: this.builder.control('', Validators.required)
  });

  addProduct(){
    this.isadd=true;
  }

  backtolist(){
    this.isadd=false;
    this.get_entries();
  }

  saveEntry(){
    debugger;
    this.servicioProdEnt.addProductEntry(
      this.entry.product,
      this.entry.price,
      this.entry.quantity
    ).subscribe(res=>{
      this.get_entries();
      this.isadd=false;
      alert('Entrada agregada');
    },
    err=>{
      alert('Error al agregar la entrada');

  });
}
getProducts(){
  this.servicioProdEnt.getProducts().subscribe(res=>{
    this.products = res.products;
  });
}

}
