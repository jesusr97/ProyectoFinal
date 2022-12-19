import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor(private loginService: UsuarioService) { }

  noMuestresMenuMantenimientos(){

    this.menu = [];
  
  }

  menu: any[] = [
    // {
    //   titulo: 'Dashboard',
    //   icono: 'mdi mdi-gauge',
    //   submenu: [
    //     { titulo: 'Main', url: '/' },
    //     { titulo: 'rxjs', url: 'rxjs' },
    //     { titulo: 'Promesas', url: 'promesas' },
    //     { titulo: 'ProgressBar', url: 'progress' },
    //   ]
    // },

    {
      titulo: 'Mantenimiento',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Usuarios', url: 'usuarios' },
        { titulo: 'Servicios', url: 'servicios' },
        { titulo: 'Ocupaciones', url: 'ocupacion' },
        { titulo: 'Trabajos', url: 'trabajos' },
      ]
    },
  ];

}
