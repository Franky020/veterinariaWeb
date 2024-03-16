import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductEntriesService {

  private url = 'http://localhost:3000/vet/product-entries';

  constructor(private http:HttpClient) { }

  getProductEntries(){
    return this.http.get<any>(this.url);
  }
}
