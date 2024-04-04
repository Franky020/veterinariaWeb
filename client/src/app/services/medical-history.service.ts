import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedicalHistoryService {

  private url = 'http://localhost:3000/vet/medical_history';

  private urlP = 'http://localhost:3000/vet/medical_history/pet';
  constructor(private http:HttpClient) { }

  getMedicalHistories(){
    return this.http.get<any>(this.url);
  }
  getMedicalHistory(id:string){
    return this.http.get<any>(this.url+'/'+id);
  }

  addMedicalHistory(
    petId: string,
    vetId: string,
    description: string,
    category: string,

  ){
    const data = {
      petId: petId,
      vetId: vetId,
     description: description,
      category: category,

    };
    debugger;
    return this.http.post<any>(this.url, data);

  }

  getMedicalHistoryPet(id:string){
    return this.http.get<any>(this.urlP+'/'+id);
  }
}
