import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  private url = 'http://localhost:3000/vet/medication';

  constructor(private http:HttpClient) { }

  getMedicines(){
    return this.http.get<any>(this.url);
  }

  addMedicine(
    medication: string,
    description: string,
    dosageForm: string, 
    dosage: string, 
    precautions: string, 
    dateExpiry: string,
    administrationRoute: string, 
    species: string[],
    category: string,
    price: string,
    quantity: string,
    image: File
  ){
    const fd = new FormData();
      fd.append('medication', medication);
      fd.append('description', description);
      fd.append('dosageForm', dosageForm);
      fd.append('dosage', dosage);
      fd.append('precautions', precautions);
      fd.append('dateExpiry', dateExpiry);
      fd.append('administrationRoute', administrationRoute);
      species.forEach(s => fd.append('species', s)); // <-- Change this
      fd.append('category', category);
      fd.append('price', price);
      fd.append('quantity', quantity);
      fd.append('image', image);
debugger;
    return this.http.post<any>(this.url, fd);
  }
  
}
