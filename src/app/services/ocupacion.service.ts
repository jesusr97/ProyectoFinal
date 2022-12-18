import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Ocupacion } from '../models/ocupacion.model';
import { Observable } from 'rxjs';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class OcupacionService {


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

  cargarOcupaciones():Observable<Ocupacion[]>{
    

    const url = `${base_url}/ocupacion`;
    
    return this.http.get<Ocupacion[]>(url, this.headers);
    // return this.http.get<Ocupacion[]>(url, this.headers)
    // .pipe(
    //   map((resp) =>{
    //     console.log(resp)
    //     // resp.ocupacion
    //   })
    // );
            
  }


  crearOcupaciones(puntuaciones: any){
         console.log('puntuaciones')
         console.log(puntuaciones)
    // const url = `${base_url}/ocupacion`;
    
    // return this.http.post(url, { puntuaciones },this.headers);
            
  }

  actualizarOcupaciones(puntuaciones: any){
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
