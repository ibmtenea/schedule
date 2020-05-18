import { Component, OnInit, HostListener } from '@angular/core';
import { PendientesService } from '../../../services/pendientes.service';
import { TemasPendientes } from '../../../models/temaspendientes.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Diser } from '../../../models/diser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ambitofuncional',
  templateUrl: './ambitofuncional.component.html'
})
export class AmbitofuncionalComponent implements OnInit {

  temas:Diser[] = [];

  campo: any;
  id_diser: any;
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
    this.pendientesServicio.getDiser()
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

   updateValue(id_diser,event, cell, valor, rowIndex:number) {
    this.editing[rowIndex + '-' + cell] = false;
    this.campo = cell;
    this.valor = valor;
    this.id_diser = id_diser;
    const id_persona = localStorage.getItem('id_persona');
    const clave = localStorage.getItem('ccom');
    this.ever =  this.campo,  this.valor,this.id_diser;
    this.datos = JSON.stringify({ "id_persona": id_persona,"campo": this.campo, "valor": this.valor ,"id_diser": this.id_diser,"clave": clave});

      this.pendientesServicio.guardarDiser(this.datos).subscribe(
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