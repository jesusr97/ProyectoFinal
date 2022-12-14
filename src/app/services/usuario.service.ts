import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interfaces';
import { Observable, of } from 'rxjs';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario: Usuario;

  constructor( private http: HttpClient ) { }

  get token():string {
    return localStorage.getItem('token') || '';
  }

  get user_id():string {
    return this.usuario.id_usuario || '';
  }

  logout(){
    localStorage.removeItem('token');
  }

  validarToken (): Observable<boolean> {

    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp:any) => {
        const { nombre, apellidos, email, fecha_nac , img = '' , saldo_puntos,
                rol, id_usuario} = resp.usuario;

        this.usuario = new Usuario( nombre, apellidos , email, 
                                    fecha_nac ,img ,
                                    saldo_puntos, rol, '' ,id_usuario );

        // this.usuario.imprimirUsuario();      

        localStorage.setItem('token', resp.token);
        return true;

      }),
      catchError( error => of(false) )
    );
  }

  crearUsuario ( formData: RegisterForm ){

   return this.http.post(`${ base_url }/usuarios`, formData )
              .pipe(
                tap((resp: any) =>{
                  localStorage.setItem('token', resp.token)
                })
              )
    
  }
  actualizarPerfil(data: {email:string, nombre: string , apellidos: string, rol:string}){

    data  = {
      ...data,
      rol: this.usuario.rol
    }
    return this.http.put(`${ base_url }/usuarios/${this.user_id}`, data, {
      headers: {
        'x-token': this.token
      }

    });

  }

  login ( formData: LoginForm ){

   return this.http.post(`${ base_url }/login`, formData )
              .pipe(
                tap((resp: any) =>{
                  localStorage.setItem('token', resp.token)
                })
              )
    
  }



}
