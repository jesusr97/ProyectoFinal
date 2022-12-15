import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public paginaDesde: number = 0;
  public cargando: boolean = true;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {

    this.cargarUsuarios();

  }

  cargarUsuarios (){

    this.cargando;

    this.usuarioService.cargarUsuarios(this.paginaDesde)
    .subscribe(({ total, usuarios }) =>{

      this.totalUsuarios = total;
      this.usuarios = usuarios;
      this.cargando= false;
      
    })

  }

  cambiarPagina(valor: number){
    this.paginaDesde += valor;

    if(this.paginaDesde < 0 ){
      this.paginaDesde = 0;
    } else if(this.paginaDesde >= this.totalUsuarios){
      this.paginaDesde -= valor;
    }

    this.cargarUsuarios();
  }

}
