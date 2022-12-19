import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Ocupacion } from 'src/app/models/ocupacion.model';
import { OcupacionService } from 'src/app/services/ocupacion.service';
import Swal from 'sweetalert2';
import { ServiciosService } from '../../../services/servicios.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss']
})
export class ServiciosComponent implements OnInit {

  public servicios: any[] = [];
  public cargando: boolean = true;
  // @Input() myInput: EventEmitter<any> | null =null
  constructor(private servicioService:ServiciosService, private http:HttpClient) { }

  get token():string {
    return localStorage.getItem('token') || '';
  }
  
  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  ngOnInit(): void {
    this.cargarServicio();
    // this.ocupacionService.crearOcupaciones();
  }


  cargarServicio() {
    // debugger;
    
    this.cargando = false;
    
    this.servicioService.cargarServicios()
        .subscribe((resp) =>{
          this.cargando= false;
          this.servicios = resp['servicios'];
          console.log(this.servicios);
        });
  }

  actualizarServicios(puntuaciones: any){

    this.servicioService.actualizarServicios(puntuaciones)
        .subscribe(resp =>{
          Swal.fire('Actualizado', puntuaciones.puntuacion, 'success');
        });
      
  }
  
  // eliminarOcupaciones(puntuaciones: any){

  //   this.ocupacionService.actualizarOcupaciones(puntuaciones)
  //       .subscribe(resp =>{
  //         Swal.fire('Actualizado', puntuaciones.puntuacion, 'success');
  //       });
      
  // }




  // Luego me servira:

//   crearOcupaciones(puntuaciones: any){
//     console.log('puntuaciones')
//     console.log(puntuaciones.usuario._id)
//    const puntuacion = puntuaciones.puntuacion;
//    const id_usuario=  puntuaciones.usuario._id;
//    const id_servicio=  puntuaciones.servicios._id;

//       const url = `${base_url}/ocupacion`;

//       return this.http.post(url, { puntuacion,id_usuario,id_servicio },this.headers);
       
// }
}
