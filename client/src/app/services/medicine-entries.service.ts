import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedicineEntriesService {

  private url = 'http://localhost:3000/vet/medication-entries';
  private url2 = 'http://localhost:3000/vet/medication/entry';
  private urlm = 'http://localhost:3000/vet/medication';

  constructor(private http:HttpClient) { }

  getMedicineEntries(){
    return this.http.get<any>(this.url);
  }

  addMedicineEntry(
    id:number,
    price: number,
    quantity: number
  ){
    debugger;
    const data = {
      id: id,
      price: price,
      quantity: quantity
    };
    return this.http.post<any>(this.url2+'/'+id, data);
  }

  getMedications(){
    return this.http.get<any>(this.urlm);
  }
}
