import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import { BusquedasService } from '../../../services/busquedas.service';
import { OcupacionComponent } from '../ocupacion/ocupacion.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  // @Output() myOutput = new EventEmitter<any>();
  // @ViewChild(OcupacionComponent) bComponent: OcupacionComponent;
  
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public paginaDesde: number = 0;
  public cargando: boolean = true;

  constructor(private usuarioService: UsuarioService, private busquedaService: BusquedasService ) { }

  ngOnInit(): void {

    this.cargarUsuarios();
    // this.bComponent.buscar() = this.myOutput;
  }

  cargarUsuarios (){

    this.cargando;

    this.usuarioService.cargarUsuarios(this.paginaDesde)
    .subscribe(({ total, usuarios }) =>{

      this.totalUsuarios = total;
      this.usuarios = usuarios;
      this.usuariosTemp = usuarios;
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

  buscar(termino:string){

    if(termino.length === 0){
      return this.usuarios = this.usuariosTemp;
    }

    this.busquedaService.buscar('usuarios',termino)
        .subscribe(resultados =>{
          this.usuarios = resultados;
        });
  }

  eliminarUsuario(usuario: Usuario){
    if(usuario.id_usuario === this.usuarioService.user_id){
      return Swal.fire('Error','No puede borrarse a si mismo','error');
    }
    Swal.fire({
      title: `¿Deseas eliminar el usuario "${usuario.nombre}"?`,
      text: "Si lo eliminas no podras revertir el cambio",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      this.usuarioService.eliminarUsuario(usuario)
      .subscribe(resp => {
            this.cargarUsuarios();  
            Swal.fire('Eliminado', `El usuario : "${usuario.nombre}" ha sido eliminado`,'success')
          });
    })
  }

  cambiarRol(usuario){

    this.usuarioService.actualizarRolUsuario(usuario)
        .subscribe(resp =>{
          
        })

  }

}
