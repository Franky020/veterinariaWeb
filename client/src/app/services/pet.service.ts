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
}
