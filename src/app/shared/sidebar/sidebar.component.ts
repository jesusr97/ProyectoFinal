import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public usuario: Usuario;
  public menuItems: any[];


  constructor( private sidebarService: SidebarService , private usuarioService:UsuarioService,
                private loginService: UsuarioService) {
    
                  if(!this.compruebaAdmin){
                    let hola: any = this.menuItems
                    hola = sidebarService.noMuestresMenuMantenimientos();
                  }
                  else{
                    this.menuItems = sidebarService.menu;
                    // console.log(this.menuItems)
                    this.usuario = usuarioService.usuario;

                  }
  }

  ngOnInit(): void {
  }

  compruebaAdmin():boolean{
    if(this.loginService.usuario.rol === 'ADMIN'){
      return true;

    }
    else if(this.loginService.usuario.rol !== 'ADMIN'){
      return false;
    }
  }

}
