import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { OcupacionService } from '../../../services/ocupacion.service';
import { Ocupacion } from '../../../models/ocupacion.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';


const base_url = environment.base_url;

@Component({
  selector: 'app-ocupacion',
  templateUrl: './ocupacion.component.html',
  styleUrls: ['./ocupacion.component.scss']
})
export class OcupacionComponent implements OnInit {

  public ocupaciones: Ocupacion[] = [];
  public cargando: boolean = true;
  // @Input() myInput: EventEmitter<any> | null =null
  constructor(private ocupacionService: OcupacionService, private http:HttpClient) { }

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
    this.cargarOcupacion();
    // this.ocupacionService.crearOcupaciones();
  }


  cargarOcupacion() {
    // debugger;
    
    this.cargando = false;
    
    this.ocupacionService.cargarOcupaciones()
        .subscribe((resp) =>{
          this.cargando= false;
          this.ocupaciones = resp['ocupacion'];
          console.log(this.ocupaciones);
        });
  }

  actualizarOcupaciones(puntuaciones: any){

    this.ocupacionService.actualizarOcupaciones(puntuaciones)
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
