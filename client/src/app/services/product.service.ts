import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = 'http://localhost:3000/vet/product';
  
  constructor(private http:HttpClient) { }

  getProducts(){
    return this.http.get<any>(this.url);
  }

  addProduct(
    product: string,
    description: string,
    price: number,
    quantity: number,
    category: string,
    specie: string,
    image: File  ){
    const fd = new FormData();
    fd.append('product', product);
    fd.append('description', description);
    fd.append('price', price.toString());
    fd.append('quantity', quantity.toString());
    fd.append('category', category);
    fd.append('specie', specie);
    fd.append('image', image);
    return this.http.post<any>(this.url, fd);
  }


  
}
