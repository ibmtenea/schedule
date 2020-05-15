import { Component, OnInit } from '@angular/core';
import { PendientesService } from '../../services/pendientes.service';
import { TemasPendientes } from '../../models/temaspendientes.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Schedule } from '../../models/schedule';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html'
})
export class ScheduleComponent implements OnInit {


  temas:Schedule[] = [];
  // getdias = new DiasSemana();

  constructor(private pendientesServicio:PendientesService) { 

  }

  ngOnInit(){
    this.getTemasDias();
    
  }

  getTemasDias(){   
    this.pendientesServicio.getDiasTemas()
    .subscribe( respuesta => {
    this.temas=respuesta;
      });
  }


   



}
