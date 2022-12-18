
interface _ocupacionUser {
    _id: string,
    nombre: string,
    img: string

}
export class Ocupacion {

    constructor(

        public ponderacion: string,
        public _id?: string,
        // public ocupacion?:any,
        public trabajos?:any,
        public usuario?: _ocupacionUser,

    ){}

}