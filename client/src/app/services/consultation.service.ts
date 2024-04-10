import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  private url = 'http://localhost:3000/vet/consult';

  private urlP = 'http://localhost:3000/vet/consult/pet';
  
  constructor(private http:HttpClient) { }

  getConsults(){
    return this.http.get<any>(this.url);
  }

  getConsult(id:string){
    return this.http.get<any>(this.url+'/'+id);
  }
  getConsultPet(id:string){
    return this.http.get<any>(this.urlP+'/'+id);
  }

  addConsult(
    petId: string,
    vetId: string,
    nameVet: string,
    diagnosis: string,
    observations: string,
    signs: string,
    treatment: string
  ){
    const data = {
      petId: petId,
      vetId: vetId,
      nameVet: nameVet,
      diagnosis: diagnosis,
      observations: observations,
      signs: signs,
      treatment: treatment
    };
    return this.http.post<any>(this.url, data);

  }
  editConsult(
    id: string,
    petId: string,
    vetId: string,
    nameVet: string,
    diagnosis: string,
    observations: string,
    signs: string,
    treatment: string
  ){
    const data = {
      petId: petId,
      vetId: vetId,
      nameVet: nameVet,
      diagnosis: diagnosis,
      observations: observations,
      signs: signs,
      treatment: treatment
    };
    return this.http.put<any>(this.url+'/'+id, data);
  }
}
