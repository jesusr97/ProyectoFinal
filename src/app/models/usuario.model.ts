import { Date } from "mongoose";
import { environment } from "src/environments/environment";

const base_url = environment.base_url;

export class Usuario {
    constructor(
       public nombre: string,
       public apellidos: string,
       public email: string,
       public fecha_nac: Date,
       public profesion: string,
       public img?: string,
       public saldo_puntos?: string,
       public rol?: string,
       public password?: string,
       public id_usuario?: string
    ){}

    // imprimirUsuario(){
    //     console.log(this.nombre);
    // }

    get imagenUrl(){
        if(this.img){
            return `${base_url}/upload/usuarios/${this.img}`;

        }else{

            return `${base_url}/upload/usuarios/no-image`;
        }
        
    }
}