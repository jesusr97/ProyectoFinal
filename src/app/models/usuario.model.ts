import { Date } from "mongoose";

export class Usuario {
    constructor(
        nombre: string,
        apellidos: string,
        email: string,
        fecha_nac: Date,
        saldo_puntos: string,
        rol: string,
        password?: string,
        public img?: string,
    ){}
}