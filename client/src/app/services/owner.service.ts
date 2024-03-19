import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  private url = 'http://localhost:3000/vet/owner';
  private urlReg = 'http://localhost:3000/user/register-owner';

  constructor(private http:HttpClient) { }

  getOwners(){
    return this.http.get<any>(this.url);
  }

  addOwner(
    name: string,
    lastName: string,
    phone: string,
    address: string,
    email: string,
    password: string,
    image: File
  ){
    const fd = new FormData();
    fd.append('name', name);
    fd.append('lastName', lastName);
    fd.append('phone', phone);
    fd.append('address', address);
    fd.append('email', email);
    fd.append('password', password);
    fd.append('image', image);
    return this.http.post<any>(this.urlReg, fd);
  }

}
