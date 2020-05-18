import { Component, OnInit, HostListener } from '@angular/core';
import { PendientesService } from '../../../services/pendientes.service';
import { TemasPendientes } from '../../../models/temaspendientes.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Dimod } from '../../../models/dimod';
import { DimodComentarios } from '../../../models/dimodcomentarios';


@Component({
  selector: 'app-infrcomunicaciones',
  templateUrl: './infrcomunicaciones.component.html'
})
export class InfrcomunicacionesComponent implements OnInit {

  temas:Dimod[] = [];
  comentariostabla:any[] = [];

  

  campo: any;
  id_dimod: any;
  id_dimod_com: any;
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
    this.getComentabla();
  }

  getTemasDias(){   
    this.pendientesServicio.getDimod()
    .subscribe( (respuesta: any) => {
    this.temas=respuesta;
    
      });
  }

  getComentabla(){   
    this.pendientesServicio.getDimodComent()
    .subscribe( (respuesta: any) => {
    this.comentariostabla=respuesta;
    
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

   updateValue(id_dimod,event, cell, valor, rowIndex:number) {
    this.editing[rowIndex + '-' + cell] = false;
    this.campo = cell;
    this.valor = valor;
    this.id_dimod = id_dimod;
    const id_persona = localStorage.getItem('id_persona');
    const clave = localStorage.getItem('ccom');
    this.ever =  this.campo,  this.valor,this.id_dimod;
    this.datos = JSON.stringify({ "id_persona": id_persona,"campo": this.campo, "valor": this.valor ,"id_dimod": this.id_dimod,"clave": clave});

      this.pendientesServicio.guardarDimod(this.datos).subscribe(
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

   /**
   * metodo que actualiza los campos
   */

  updateValueComent(id_dimod_com,event, cell, valor, rowIndex:number) {
    this.editing[rowIndex + '-' + cell] = false;
    this.campo = cell;
    this.valor = valor;
    this.id_dimod_com = id_dimod_com;
    const id_persona = localStorage.getItem('id_persona');
    const clave = localStorage.getItem('ccom');
    this.ever =  this.campo,  this.valor,this.id_dimod_com;
    this.datos = JSON.stringify({ "id_persona": id_persona,"campo": this.campo, "valor": this.valor ,"id_dimod_com": this.id_dimod_com,"clave": clave});

      this.pendientesServicio.guardarDimodComent(this.datos).subscribe(
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