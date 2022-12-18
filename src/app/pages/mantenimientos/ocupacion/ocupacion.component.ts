import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { OcupacionService } from '../../../services/ocupacion.service';
import { Ocupacion } from '../../../models/ocupacion.model';
@Component({
  selector: 'app-ocupacion',
  templateUrl: './ocupacion.component.html',
  styleUrls: ['./ocupacion.component.scss']
})
export class OcupacionComponent implements OnInit {

  public ocupaciones: Ocupacion[] = [];
  public cargando: boolean = true;
  // @Input() myInput: EventEmitter<any> | null =null
  constructor(private ocupacionService: OcupacionService) { }

  ngOnInit(): void {
    this.cargarOcupacion();
  }


  cargarOcupacion() {
    // debugger;
    
    this.cargando = false;
    
    this.ocupacionService.cargarOcupaciones()
        .subscribe((resp) =>{
          this.cargando= false;
          this.ocupaciones = resp['ocupacion']
          console.log(resp['ocupacion']);
        });
  }


}
