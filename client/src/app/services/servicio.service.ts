import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private url = 'http://localhost:3000/vet/service';

  constructor(private http:HttpClient) { }

  getServices(){
    return this.http.get<any>(this.url);
  }

  addService(
    service: string,
    description: string,
    category: string,
    felino: {P: number, M: number, G: number},
    canino: {P: number, M: number, G: number}
  ){
    const fd = new FormData();
    fd.append('service', service);
    fd.append('description', description);
    fd.append('category', category);
    fd.append('felino', JSON.stringify(felino));
    fd.append('canino', JSON.stringify(canino));
    return this.http.post<any>(this.url, fd);
  }
}
