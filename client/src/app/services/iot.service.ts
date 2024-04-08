import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class IotService {

  constructor(private http: HttpClient) { }

  private url = "http://192.168.100.4:3000/api/componentes";
  private urlDow = "http://192.168.100.4:3000/api/componentes/apagarAlimentador/dht11";
  private urlUp = "http://192.168.100.4:3000/api/componentes/encenderAlimentador/dht11";
  private urlAliUp = "http://192.168.100.4:3000/api/componentes/apaAlimentador/dht11";
  private urlAliDow = "http://192.168.100.4:3000/api/componentes/enAlimentador/dht11";

  consultarSensor(){
    // Concatenar this.url con el componente_id para formar la URL completa
    return this.http.get<any>(this.url);
  }

  apagarTemp(){
    return this.http.patch<any>(this.urlDow, {});
  }

  encenderTemp() {
    // Realizar la solicitud HTTP PATCH al servidor para cambiar el estado del alimentador
    return this.http.patch<any>(this.urlUp, {});
  }

  apagarAli(){
    return this.http.patch<any>(this.urlAliDow, {});
  }

  encenderAli() {
    // Realizar la solicitud HTTP PATCH al servidor para cambiar el estado del alimentador
    return this.http.patch<any>(this.urlAliUp, {});
  }
}
