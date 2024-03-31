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

  getServicesById(id: number){
    return this.http.get<any>(`${this.url}/${id}`);
  }

  addService(
    service: string,
    description: string,
    category: string,
    felino: {P: number, M: number, G: number},
    canino: {P: number, M: number, G: number}
  ){
    debugger;
    const data = {
      service: service,
      description: description,
      category: category,
      felino: {
        P: Number(felino.P),
        M: Number(felino.M),
        G: Number(felino.G)
      },
      canino: {
        P: Number(canino.P),
        M: Number(canino.M),
        G: Number(canino.G)
      }
    };
    return this.http.post<any>(this.url, data);
  }

  editService(
    id: number,
    service: string,
    description: string,
    category: string,
    felino: {P: number, M: number, G: number},
    canino: {P: number, M: number, G: number},
    state: string
  ){
    const data = {
      service: service,
      description: description,
      category: category,
      felino: {
        P: Number(felino.P),
        M: Number(felino.M),
        G: Number(felino.G)
      },
      canino: {
        P: Number(canino.P),
        M: Number(canino.M),
        G: Number(canino.G)
      },
      state: state
    };
    return this.http.put<any>(`${this.url}/${id}`, data);
  }

  deleteService(id: number){
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}
