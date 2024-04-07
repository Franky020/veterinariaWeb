import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = "http://localhost:3000/auth/login";
  private url2 = "http://localhost:3000/auth/loginEmp";

  constructor(private http:HttpClient, private router: Router) { }

  login(usuario:object){
    return this.http.post<any>(this.url,usuario);
  }
  getEmployee(id:object){
    return this.http.get<any>(this.url2+`/${id}`);
  }
  
  getToken(){
    return localStorage.getItem('jwtoken');
  }
  employeeType(){
    return localStorage.getItem('employeeType');
  }

  cerrarsesion(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  isLoggedIn(){
    return !!localStorage.getItem('jwtoken');
  }
}
