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

  addPet(
    id: string,
    name: string,
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
    fd.append('health', health);
    fd.append('gender', gender);
    fd.append('weight', weight.toString());
    fd.append('specie', specie);
    fd.append('owner', owner);
    fd.append('imageP', imageP);
    return this.http.post<any>(this.url, fd);
  }
}
