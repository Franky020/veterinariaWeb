import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  private url = 'http://localhost:3000/vet/owner';

  constructor(private http:HttpClient) { }

  getOwners(){
    return this.http.get<any>(this.url);
  }
}
