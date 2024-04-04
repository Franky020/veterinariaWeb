import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

//services
import { ProductService } from '../../services/product.service';

//material elements
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

interface Category {
  value: string;
  viewValue: string;
}
interface Specie {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatCardModule, MatPaginatorModule, MatPaginator, MatTableModule, MatFormFieldModule, CommonModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatInputModule, MatSelectModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  displayedColumns: string[] = ['id', 'product', 'description', 'price', 'quantity', 'category', 'specie', 'image', 'action'];
  dataSource: any;
  editData: any;

  @ViewChild(MatPaginator) paginator !: MatPaginator;

  isadd = false;
  isedit = false;

  products: any;

  product = {
    id: 0,
    product: '',
    description: '',
    price: 0,
    quantity: 0,
    category: '',
    specie: '',
    image: ''
  }
  image: any;
  image2: any;

  //select components
  categories: Category[] = [
    { value: 'Alimento', viewValue: 'Alimento' },
    { value: 'Higiene', viewValue: 'Higiene' },
    { value: 'Ropa', viewValue: 'Ropa' },
    { value: 'Accesorios', viewValue: 'Accesorios' },
    { value: 'Juguetes', viewValue: 'Juguetes' },
    { value: 'Salud', viewValue: 'Salud' }
  ];
  species: Specie[] = [
    { value: 'Felinos', viewValue: 'Felinos' },
    { value: 'Caninos', viewValue: 'Caninos' },
    { value: 'Roedores', viewValue: 'Roedores' },
    { value: 'Aves', viewValue: 'Aves' }
  ];

  constructor(private servicioProd: ProductService, private builder: FormBuilder) { }

  ngOnInit(): void {
    this.get_products();
  }

  get_products() {
    this.servicioProd.getProducts().subscribe(res => {
      //debugger;
      this.products = res;

      this.dataSource = new MatTableDataSource(this.products.products);
      this.dataSource.paginator = this.paginator;
    });

  }

  ///// Search function
  searchTerm = '';

  search() {
    if (this.searchTerm != '') {
      this.dataSource = new MatTableDataSource(this.products.products.filter((product: any) => {
        return product.product.toLowerCase().includes(this.searchTerm.toLowerCase());
      }));
      this.dataSource.paginator = this.paginator;
    } else {
      this.get_products();
    }
  }

  ///Form creation
  productsForm = this.builder.group({
    id: this.builder.control({ value: 0, disabled: true }),
    product: this.builder.control('', Validators.required),
    description: this.builder.control('', Validators.required),
    price: this.builder.control('', Validators.required),
    quantity: this.builder.control('', Validators.required),
    category: this.builder.control('', Validators.required),
    specie: this.builder.control('', Validators.required),
    image: this.builder.control(''),

  });

  addProduct() {
    this.isadd = true;
  }

  backtolist() {
    this.get_products();
    this.isadd = false;
    this.isedit = false;

    this.productsForm.reset();

  }

  saveProduct() {
    debugger;
    if (this.productsForm.valid) {

      if (this.isadd) {
        this.servicioProd.addProduct(
          this.product.product,
          this.product.description,
          this.product.price,
          this.product.quantity,
          this.product.category,
          this.product.specie,
          this.image,
        ).subscribe(res => {
         
          alert('Producto agregado');
          this.backtolist();
        },
          error => {
            alert('Error al agregar el producto');
          });
      } else {
        debugger;

        this.servicioProd.editProduct(
          this.product.id,
          this.product.product,
          this.product.description,
          this.product.price,
          this.product.quantity,
          this.product.category,
          this.product.specie,
          this.image

        ).subscribe(res => {
          alert('Producto editado');
          this.backtolist();
        },
          error => {
            alert('Error al editar el producto');
          });
      }
    }
  }

  fotoSeleccionada1(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.image = <File>event.target.files[0];
    }
  }

  showProductEdit(id: number) {
    //debugger;
    this.servicioProd.getProduct(id).subscribe(res => {
      this.editData = res;
      this.product.image = res.product.image;

      this.productsForm.setValue({
        id: this.editData.product._id,
        product: this.editData.product.product,
        description: this.editData.product.description,
        price: this.editData.product.price,
        quantity: this.editData.product.quantity,
        category: this.editData.product.category,
        specie: this.editData.product.specie,
        image: this.editData.product.image
      });
    });
    this.isedit = true;;
  }
  deleteProduct(id: number) {
    if(confirm('¿Está seguro de eliminar el producto?')){
      this.servicioProd.deleteProduct(id).subscribe(res => {
        alert('Producto eliminado');
        this.get_products();
      },
      error => {
        alert('Error al eliminar el producto');
      });
    }
  }
}
