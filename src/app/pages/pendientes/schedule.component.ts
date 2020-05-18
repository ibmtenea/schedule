import { Component, OnInit, HostListener } from '@angular/core';
import { PendientesService } from '../../services/pendientes.service';
import { TemasPendientes } from '../../models/temaspendientes.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Schedule } from '../../models/schedule';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html'
})
export class ScheduleComponent implements OnInit {


  temas:Schedule[] = [];

  campo: any;
  id_pendi: any;
  id_persona: any;
  valor: any;
  editing = {};
  ever: any;
  req: any;
  datos: string;

      // //click fuera del input
      @HostListener('document:click', ['$event'])
      clickout(event) {
        
      }

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


   /**
   * reload pagina al usar sweet alerts etc
   */
  recarga() {
    location.reload();
  }



  /**
   * metodo que actualiza los campos
   */

   updateValue(id_pendi,event, cell, valor, rowIndex:number) {
    this.editing[rowIndex + '-' + cell] = false;
    this.campo = cell;
    this.valor = valor;
    this.id_pendi = id_pendi;
    const id_persona = localStorage.getItem('id_persona');
    const clave = localStorage.getItem('ccom');
    this.ever =  this.campo,  this.valor,this.id_pendi;
    this.datos = JSON.stringify({ "id_persona": id_persona,"campo": this.campo, "valor": this.valor ,"id_pendi": this.id_pendi,"clave": clave});



      this.pendientesServicio.guardarSchedule(this.datos).subscribe(
        datos => {
          Swal.fire({
            text: 'Registro actualizado',
            icon: 'success',
            showConfirmButton: false
          })
          // , this.recarga();
          , this.ngOnInit();
        });
   
  }



}
