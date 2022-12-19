import { Component, OnInit  } from '@angular/core';

import { SettingsService } from '../services/settings.service';
import { UsuarioService } from '../services/usuario.service';

declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor( private settingsService: SettingsService , private loginService: UsuarioService) { }

  ngOnInit(): void {
    customInitFunctions();
  }

  compruebaAdmin():boolean{
    if(this.loginService.usuario.rol === 'ADMIN'){
      return true;

    }
    else{
      return false;
    }
  }

}

