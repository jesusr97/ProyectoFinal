import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
@Component({
  selector: 'app-ocupacion',
  templateUrl: './ocupacion.component.html',
  styleUrls: ['./ocupacion.component.scss']
})
export class OcupacionComponent implements OnInit {

  // @Input() myInput: EventEmitter<any> | null =null
  constructor() { }

  ngOnInit(): void {
  }

  calculoPuntosDias(){

  }
}
