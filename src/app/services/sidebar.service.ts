import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Main', url: '/' },
        { titulo: 'rxjs', url: 'rxjs' },
        { titulo: 'Promesas', url: 'promesas' },
        { titulo: 'ProgressBar', url: 'progress' },
      ]
    },

    {
      titulo: 'Mantenimiento Usuario',
      icono: 'mdi mdi-foler-lock-open',
      submenu: [
        { titulo: 'Usuarios', url: 'usuarios' },
        { titulo: 'Servicios', url: 'servicios' },
        { titulo: 'Ocupaciones', url: 'ocupaciones' },
        { titulo: 'Trabajos', url: 'trabajos' },
      ]
    },
  ];

  constructor() { }
}
