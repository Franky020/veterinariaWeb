import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private url = 'http://localhost:3000/vet/employee';
  private urlReg = 'http://localhost:3000/user/register-employee';


  constructor(private http:HttpClient) { }

  getEmployees(){
    return this.http.get<any>(this.url);
  }

  addEmployee(
    name: string,
    lastName: string,
    phone: string,
    type: string,
    email: string,
    password: string,
    image: File
  ){
    const fd = new FormData();
    fd.append('name', name);
    fd.append('lastName', lastName);
    fd.append('phone', phone);
    fd.append('type', type);
    fd.append('email', email);
    fd.append('password', password);
    fd.append('image', image);
    return this.http.post<any>(this.urlReg, fd);
  }
}
