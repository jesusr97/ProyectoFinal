import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError, delay } from 'rxjs/operators';
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

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }
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
        const { nombre, apellidos, email, fecha_nac ,profesion,img = '' , saldo_puntos,
                rol, id_usuario} = resp.usuario;

        this.usuario = new Usuario( nombre, apellidos , email, 
                                    fecha_nac ,profesion,img ,
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
    console.log(this.user_id);
    data  = {
      ...data,
      rol: this.usuario.rol
    }
    return this.http.put(`${ base_url }/usuarios/${this.user_id}`, data, this.headers);

  }

  login ( formData: LoginForm ){

   return this.http.post(`${ base_url }/login`, formData )
              .pipe(
                tap((resp: any) =>{
                  localStorage.setItem('token', resp.token)
                })
              )
    
  }

  cargarUsuarios(desde: number = 0){

    const url = `${base_url}/usuarios?pag=${desde}`;
    return this.http.get<any>(url, this.headers)
            .pipe( delay(500), map(resp =>{
              const usuarios = resp.usuarios.map(user => new Usuario(user.nombre, user.apellidos,
                 user.email,user.fecha_nac,user.profesion,user.img,user.saldo_puntos,user.rol,'',user.id_usuario))
              return {
                total: resp.total,
                usuarios
              };
            }))
  }

  eliminarUsuario(usuario:Usuario){
    
    const url = `${base_url}/usuarios/${usuario.id_usuario}`;
    return this.http.delete(url, this.headers);
  }

  actualizarRolUsuario(usuario: Usuario){

    return this.http.put(`${ base_url }/usuarios/${usuario.id_usuario}`, usuario, this.headers);

  }

}
