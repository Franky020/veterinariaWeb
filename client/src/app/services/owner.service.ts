import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  private url = 'http://localhost:3000/vet/owner';
  private urlReg = 'http://localhost:3000/user/register-owner';
  private urlP = 'http://localhost:3000/owner/myPets';
  private urlVP = 'http://localhost:3000/vet/pet';

  constructor(private http:HttpClient) { }

  getOwners(){
    return this.http.get<any>(this.url);
  }
  getOwner(id:number){
    return this.http.get<any>(this.url+'/'+id);
  }
  getOwnerD(id:string){
    return this.http.get<any>(this.url+'/'+id);
  }

  addOwner(
    name: string,
    lastName: string,
    phone: string,
    email: string,
    password: string,
    image: File
  ){
    const fd = new FormData();
    fd.append('name', name);
    fd.append('lastName', lastName);
    fd.append('phone', phone);
    fd.append('email', email);
    fd.append('password', password);
    fd.append('image', image);
    return this.http.post<any>(this.urlReg, fd);
  }

  editOwner(id:number, name:string, lastName:string, phone:string, image:File ){
      
      const fd = new FormData();
      fd.append('id', id.toString());
      fd.append('name', name);
      fd.append('lastName', lastName);
      fd.append('phone', phone);
      fd.append('image', image);
      return this.http.put<any>(this.url+'/'+id, fd);
    }

  deleteOwner(id:number){
    return this.http.delete<any>(this.url+'/'+id);
  }

  getPetsOwner(id:string){
    return this.http.get<any>(this.urlP+'/'+id);
  }

  // addPet(
  //   id: string,
  //   name: string,
  //   age: number,
  //   health: string,
  //   gender: string,
  //   weight: number,
  //   specie: string,
  //   owner: string,
  //   imageP: File
  // ){
  //   const fd = new FormData();
  //   fd.append('id', id);
  //   fd.append('name', name);
  //   fd.append('age', age.toString());
  //   fd.append('health', health);
  //   fd.append('gender', gender);
  //   fd.append('weight', weight.toString());
  //   fd.append('specie', specie);
  //   fd.append('owner', owner);
  //   fd.append('imageP', imageP);
  //   return this.http.post<any>(this.urlVP, fd);
  // }

}
