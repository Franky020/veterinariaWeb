import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductEntriesService {

  private url = 'http://localhost:3000/vet/product-entries';
  private url2 = 'http://localhost:3000/vet/product/entry';
  private urlp = 'http://localhost:3000/vet/product';

  constructor(private http:HttpClient) { }

  getProductEntries(){
    return this.http.get<any>(this.url);
  }

  addProductEntry(
    id: number,
    price: number,
    quantity: string,

  ){
    debugger;
    const data = {
      id: id,
      price: price,
      quantity: quantity
    };
    return this.http.post<any>(this.url2+'/'+id, data);
  }

  getProducts(){
    return this.http.get<any>(this.urlp);
  }
}
