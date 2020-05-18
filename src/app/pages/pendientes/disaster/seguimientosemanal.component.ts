import { Component, OnInit, HostListener } from '@angular/core';
import { PendientesService } from '../../../services/pendientes.service';
import { TemasPendientes } from '../../../models/temaspendientes.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { SeguimientoSemanal } from '../../../models/seguimientosemanal';

@Component({
  selector: 'app-seguimientosemanal',
  templateUrl: './seguimientosemanal.component.html'
})
export class SeguimientosemanalComponent implements OnInit {


  temas:SeguimientoSemanal[] = [];


  

  campo: any;
  id_sema: any;
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
    this.pendientesServicio.getSema()
    .subscribe( (respuesta: any) => {
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

   updateValue(id_sema,event, cell, valor, rowIndex:number) {
    this.editing[rowIndex + '-' + cell] = false;
    this.campo = cell;
    this.valor = valor;
    this.id_sema = id_sema;
    const id_persona = localStorage.getItem('id_persona');
    const clave = localStorage.getItem('ccom');
    this.ever =  this.campo,  this.valor,this.id_sema;
    this.datos = JSON.stringify({ "id_persona": id_persona,"campo": this.campo, "valor": this.valor ,"id_sema": this.id_sema,"clave": clave});

      this.pendientesServicio.guardarSema(this.datos).subscribe(
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