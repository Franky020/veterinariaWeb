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

interface Category{
  value: string;
  viewValue: string;
}
interface Specie{
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-entries-products',
  standalone: true,
  imports: [MatCardModule, MatPaginatorModule,MatPaginator, MatTableModule, MatFormFieldModule, CommonModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './entries-products.component.html',
  styleUrl: './entries-products.component.css'
})
export class EntriesProductsComponent {
  displayedColumns: string[] = ['id','product','description','price','quantity','category', 'specie','image','image2'];
  dataSource: any;
  editData: any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  isadd=false;
  isedit=false;

  products: any;

  product = {
    id: 0,
    product:'',
    description: '',
    price: 0,
    quantity: '',
    category:'',
    specie: '',
    image: '',
    image2: ''
  }
  image : any;
  image2: any;

  //select components
  categories: Category[] = [
    {value: 'Alimento', viewValue: 'Alimento'},
    {value: 'Higiene', viewValue: 'Higiene'},
    {value: 'Ropa', viewValue: 'Ropa'},
    {value: 'Accesorios', viewValue: 'Accesorios'},
    {value: 'Juguetes', viewValue: 'Juguetes'},
    {value: 'Salud', viewValue: 'Salud'}
  ]; 
  species: Specie[] = [
    {value: 'Felines', viewValue: 'Gatos'},
    {value: 'Canines', viewValue: 'Perros'},
    {value: 'Rodents', viewValue:'Roedores'},
    {value: 'Birds', viewValue: 'Aves'}             
  ];

  constructor(private builder: FormBuilder){}

  ngOnInit(): void{
    this.get_products();
  }

  get_products(){
    this.products = [
     {id: 1, product: 'Corte de Cabello', description: 'Corte de cabello para caballero', price: 100, quantity: 10, category: 'Corte', specie: 'Caballero', image: 'assets/images/corte.jpg', image2: 'assets/images/corte2.jpg'},
      {id: 2, product: 'Corte de Barba', description: 'Corte de barba para caballero', price: 50, quantity: 10, category: 'Corte', specie: 'Caballero', image: 'assets/images/barba.jpg', image2: 'assets/images/barba2.jpg'}
    ]
    this.dataSource = new MatTableDataSource(this.products);
    this.dataSource.paginator = this.paginator;
  }

  productsForm = this.builder.group({
    id: this.builder.control({ value: 0, disabled: true }),
    product: this.builder.control('', Validators.required),
    description: this.builder.control('', Validators.required),
    price: this.builder.control('', Validators.required),
    quantity: this.builder.control('', Validators.required),
    category: this.builder.control('', Validators.required),
    specie: this.builder.control('', Validators.required),
    image: this.builder.control(''),
    image2: this.builder.control(''),

  });

  addProduct(){
    this.isadd=true;
  }

  backtolist(){
    this.isadd=false;
    this.get_products();
  }

}
