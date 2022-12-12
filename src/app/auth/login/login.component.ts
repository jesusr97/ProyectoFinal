import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent {

  public FormularioEnviado =false

  public formularioLogin = this.fb.group({

    email: [localStorage.getItem('email') || '',[ Validators.required , Validators.email]],                    // eliminiar luego pot defecto (solo para pruebas)
    password: ['',[ Validators.required , Validators.minLength(6)]],
    recuerdame: [false]                    // eliminiar luego pot defecto (solo para pruebas)


  });

  constructor( private router: Router , private  fb: FormBuilder , private usuarioService: UsuarioService) { }

  login() {
      this.usuarioService.login( this.formularioLogin.value)
        .subscribe( resp => {

          if(this.formularioLogin.get('recuerdame').value){
            localStorage.setItem('email', this.formularioLogin.get('email').value)
          }
          else{
            localStorage.removeItem('email');

          }

        // Navegar a la pagina principal (despues de loguearse)
        this.router.navigateByUrl('/');

        }, (err =>{
         Swal.fire('Error',err.error.msg,'error');
        }));
  }

}
