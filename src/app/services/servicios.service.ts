import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ocupacion } from '../models/ocupacion.model';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(private http:HttpClient) { }


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

  cargarServicios():Observable<Ocupacion[]>{
    

    const url = `${base_url}/servicios`;
    
    return this.http.get<any>(url, this.headers);
    // return this.http.get<Ocupacion[]>(url, this.headers)
    // .pipe(
    //   map((resp) =>{
    //     console.log(resp)
    //     // resp.ocupacion
    //   })
    // );
            
  }


  crearServicios(puntuaciones: any){
         console.log('puntuaciones')
         console.log(puntuaciones)
    // const url = `${base_url}/ocupacion`;
    
    // return this.http.post(url, { puntuaciones },this.headers);
            
  }

  actualizarServicios(puntuaciones: any){
    console.log('puntuaciones')
    console.log(puntuaciones.usuario._id)
   const puntuacion = puntuaciones.puntuacion;
   const id_ocupacion=  puntuaciones._id;
   const usuario=  puntuaciones.usuario._id;
   const servicios=  puntuaciones.servicios._id;

      const url = `${base_url}/ocupacion/${id_ocupacion}`;

      return this.http.put(url, { puntuacion, usuario},this.headers);
            
  }
}
