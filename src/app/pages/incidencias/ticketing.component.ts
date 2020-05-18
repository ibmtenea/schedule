import { Tickets } from '../../models/tickets';
import { IncidenciasService } from '../../services/incidencias.service';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Component,OnInit, HostListener } from '@angular/core';





@Component({
  selector: 'app-ticketing',
  templateUrl: './ticketing.component.html'
})
export class TicketingComponent implements  OnInit {


  ticketing:Tickets[] = [];

  campo: any;
  id_tike: any;
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


  constructor(private incidenciasServicio: IncidenciasService) { }

  ngOnInit() {
    this.getTicketing();
  }


  getTicketing(){   
    this.incidenciasServicio.getTicketing()
    .subscribe( respuesta => {
    this.ticketing=respuesta;
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

   updateValue(id_tiket,event, cell, valor, rowIndex:number) {
    this.editing[rowIndex + '-' + cell] = false;
    this.campo = cell;
    this.valor = valor;
    this.id_tike = id_tiket;
    const id_persona = localStorage.getItem('id_persona');
    const clave = localStorage.getItem('ccom');
    this.ever =  this.campo,  this.valor,this.id_tike;
    this.datos = JSON.stringify({ "id_persona": id_persona,"campo": this.campo, "valor": this.valor ,"id_tike": this.id_tike,"clave": clave});
    var patronNumeros = /[0-9]+/;
    var numberResult = patronNumeros.test(this.valor);

    if (numberResult==false) {
      Swal.fire({
        title: 'Revise los datos',
        text: 'Solo puede introducir números. Si desea vaciar la columna, escriba un 0',
        icon: 'error',
        showConfirmButton: true
      });
      this.ngOnInit();
    } else {
      this.incidenciasServicio.guardarTicketing(this.datos).subscribe(
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


}
