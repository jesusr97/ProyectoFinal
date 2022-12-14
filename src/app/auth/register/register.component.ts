import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent{

  public FormularioEnviado =false

  public formularioRegistro = this.fb.group({

    nombre: ['Jesuseorjs',[ Validators.required , Validators.minLength(3)] ],  // esto es para que salga por defecto rellenado con el nombre que queramos
    apellidos: ['Rueda',[ Validators.required , Validators.minLength(3)] ],  // esto es para que salga por defecto rellenado con el nombre que queramos
    email: ['jesusete2@gmail.com',[ Validators.required , Validators.email]],                    // eliminiar luego pot defecto (solo para pruebas)
    password: ['1234',[ Validators.required , Validators.minLength(4)]],                    // eliminiar luego pot defecto (solo para pruebas)
    password2: ['1234',[ Validators.required , Validators.minLength(4)]],                    // eliminiar luego pot defecto (solo para pruebas)
    fecha_nac: ['',[ Validators.required]],                    // eliminiar luego pot defecto (solo para pruebas)
    terminos: [true,[ Validators.required]], 

  },{
    validator: this.passwordsIguales('password','password2')
  });

  constructor( private fb: FormBuilder, 
    private usuarioService: UsuarioService , private router: Router) { }

  crearUsuario() {
    this.FormularioEnviado =true
    // console.log(this.formularioRegistro.value);
    console.log(this.formularioRegistro.value);

    if(this.formularioRegistro.invalid){
      return
    }


    // Realizar la creacion de usuario

    this.usuarioService.crearUsuario( this.formularioRegistro.value )
        .subscribe(resp => {
          
        // Navegar a la pagina principal (despues de loguearse)
        this.router.navigateByUrl('/');

        }, (err) => {
          // Si sucede un error
          Swal.fire('Error', err.error.msg, 'error');
        });
  }

  camposNoValidos(campo: string): boolean {

    if(this.formularioRegistro.get(campo).invalid && this.FormularioEnviado){
      return true
    }
    else{
      return false;
    }

  }
  aceptaTerminos(){
    return! this.formularioRegistro.get('terminos').value && this.FormularioEnviado;
  }

  contrasenasNoValidas(){
    const pass1 = this.formularioRegistro.get('password').value;
    const pass2 = this.formularioRegistro.get('password2').value;

    if((pass1 !== pass2) && this.FormularioEnviado){
      return true;
    }
    else{
      return false;
    }
  }

  passwordsIguales(pass1Name: string, pass2Name: string ){

    return ( formGroup: FormGroup ) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if( pass1Control.value === pass2Control.value ){
        pass2Control.setErrors(null);
      }
      else{
        pass2Control.setErrors({noEsIgual: true});
      }

    }
  }

}
