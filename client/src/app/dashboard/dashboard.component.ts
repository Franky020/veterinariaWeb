import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
//components
import { NavigationComponent } from '../navigation/navigation.component';

//services
import { IotService } from '../services/iot.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavigationComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  ngOnInit(): void {
    this.consultarComponentes();
  }

  componente = {
    componente_id: "",
    descripcion: "",
    ubicacion: "",
    activo: "",
    tipo: "",
    valor: "",
    medicion: ""
  }

  componentes:any;
  constructor(private service: IotService) { }

  consultarComponentes(){
    this.componentes = this.service.consultarSensor();
  }
  consultar(){
    this.service.consultarSensor().subscribe(
      res => {
        this.componente.componente_id = res.com.componente_id;
        this.componente.descripcion = res.com.descripcion;
        this.componente.ubicacion = res.com.ubicacion;
        this.componente.activo = res.com.activo;
        this.componente.tipo = res.com.tipo;
        this.componente.valor = res.com.valor;
        this.componente.medicion = res.com.medicion;
      },
      err => {
        alert("componente con error")
        this.componente.componente_id = "";
        this.componente.descripcion = "";
        this.componente.ubicacion = "";
        this.componente.activo = "";
        this.componente.tipo = "";
        this.componente.valor = "";
        this.componente.medicion = "";
      }
    )
  };

  apagarTemp() {
    this.service.apagarTemp().subscribe(
      respuesta => {
        console.log('El estado del alimentador se cambió con éxito:', respuesta);
        window.location.reload();
        // Realiza cualquier otra lógica necesaria después de cambiar el estado del alimentador
      },
      error => {
        console.error('Error al cambiar el estado del alimentador:', error);
        // Maneja el error de manera adecuada
      }
    );
  }

  encenderTemp() {
    this.service.encenderTemp().subscribe(
      respuesta => {
        console.log('El estado del alimentador se cambió con éxito:', respuesta);
        window.location.reload();
        // Realiza cualquier otra lógica necesaria después de cambiar el estado del alimentador
      },
      error => {
        console.error('Error al cambiar el estado del alimentador:', error);
        // Maneja el error de manera adecuada
      }
    );
  }

  apagarAli() {
    this.service.apagarAli().subscribe(
      respuesta => {
        console.log('El estado del alimentador se cambió con éxito:', respuesta);
        window.location.reload();
        // Realiza cualquier otra lógica necesaria después de cambiar el estado del alimentador
      },
      error => {
        console.error('Error al cambiar el estado del alimentador:', error);
        // Maneja el error de manera adecuada
      }
    );
  }

  encenderAli() {
    this.service.encenderAli().subscribe(
      respuesta => {
        console.log('El estado del alimentador se cambió con éxito:', respuesta);
        window.location.reload();
        // Realiza cualquier otra lógica necesaria después de cambiar el estado del alimentador
      },
      error => {
        console.error('Error al cambiar el estado del alimentador:', error);
        // Maneja el error de manera adecuada
      }
    );
  }
}
