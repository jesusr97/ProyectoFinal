import { Component} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent{

  public FormularioEnviado =false

  public formularioRegistro = this.fb.group({

    nombre: ['',[ Validators.required , Validators.minLength(3)] ],  // esto es para que salga por defecto rellenado con el nombre que queramos
    email: ['',[ Validators.required , Validators.email]],                    // eliminiar luego pot defecto (solo para pruebas)
    password: ['',[ Validators.required , Validators.minLength(6)]],                    // eliminiar luego pot defecto (solo para pruebas)
    password2: ['',[ Validators.required , Validators.minLength(6)]],                    // eliminiar luego pot defecto (solo para pruebas)
    fechaNacimiento: ['',[ Validators.required]],                    // eliminiar luego pot defecto (solo para pruebas)
    terminos: [false,[ Validators.required]], 
                                                 // eliminiar luego pot defecto (solo para pruebas)
  });

  constructor( private fb: FormBuilder) { }

  crearUsuario() {
    this.FormularioEnviado =true
    console.log(this.formularioRegistro.value);
  }

  camposNoValidos(campo: string): boolean {

    if(this.formularioRegistro.get(campo).invalid && this.FormularioEnviado){
      return true
    }
    else{
      return false;
    }

  }

}
