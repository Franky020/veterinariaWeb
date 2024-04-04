import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private url = 'http://localhost:3000/vet/pet';

  constructor(private http:HttpClient) { }

  getPets(){
    return this.http.get<any>(this.url);
  }

  getPet(id:string){
    return this.http.get<any>(this.url+'/'+id);
  }

  addPet(
    id: string,
    name: string,
    breed: string,
    age: number,
    health: string,
    gender: string,
    weight: number,
    specie: string,
    owner: string,
    imageP: File
  ){
    const fd = new FormData();
    fd.append('id', id);
    fd.append('name', name);
    fd.append('age', age.toString());
    fd.append('breed', breed);
    fd.append('health', health);
    fd.append('gender', gender);
    fd.append('weight', weight.toString());
    fd.append('specie', specie);
    fd.append('ownerId', owner);
    fd.append('image', imageP);
    debugger;

    return this.http.post<any>(this.url, fd);
  }

  editPet(
    id: string,
    name: string,
    breed: string,
    age: number,
    health: string,
    gender: string,
    weight: number,
    specie: string,
    owner: string,
    imageP: File){
    const fd = new FormData();
    fd.append('id', id);
    fd.append('name', name);
    fd.append('age', age.toString());
    fd.append('breed', breed);
    fd.append('health', health);
    fd.append('gender',gender);
    fd.append('weight', weight.toString());
    fd.append('specie', specie);
    fd.append('ownerId', owner);
    fd.append('image', imageP);
    debugger;
    return this.http.put<any>(this.url+'/'+id, fd);
    }
    
    deletePet(id:string){
      return this.http.delete<any>(this.url+'/'+id);
    }

}
