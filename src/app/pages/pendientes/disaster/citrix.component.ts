import { Component, OnInit, HostListener } from '@angular/core';
import { PendientesService } from '../../../services/pendientes.service';
import { TemasPendientes } from '../../../models/temaspendientes.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Citrix } from '../../../models/citrix';

@Component({
  selector: 'app-citrix',
  templateUrl: './citrix.component.html'
  
})
export class CitrixComponent implements OnInit {


  temas:Citrix[] = [];
  comentariostabla:any[] = [];

  

  campo: any;
  id_citrix: any;
  id_citrix_com: any;
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
    this.pendientesServicio.getCitrix()
    .subscribe( (respuesta: any) => {
    this.temas=respuesta;
    
      });
  }

  getComentabla(){   
    this.pendientesServicio.getCitrixComent()
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

   updateValue(id_citrix,event, cell, valor, rowIndex:number) {
    this.editing[rowIndex + '-' + cell] = false;
    this.campo = cell;
    this.valor = valor;
    this.id_citrix = id_citrix;
    const id_persona = localStorage.getItem('id_persona');
    const clave = localStorage.getItem('ccom');
    this.ever =  this.campo,  this.valor,this.id_citrix;
    this.datos = JSON.stringify({ "id_persona": id_persona,"campo": this.campo, "valor": this.valor ,"id_citrix": this.id_citrix,"clave": clave});

      this.pendientesServicio.guardarCitrix(this.datos).subscribe(
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

  updateValueComent(id_citrix_com,event, cell, valor, rowIndex:number) {
    this.editing[rowIndex + '-' + cell] = false;
    this.campo = cell;
    this.valor = valor;
    this.id_citrix_com = id_citrix_com;
    const id_persona = localStorage.getItem('id_persona');
    const clave = localStorage.getItem('ccom');
    this.ever =  this.campo,  this.valor,this.id_citrix_com;
    this.datos = JSON.stringify({ "id_persona": id_persona,"campo": this.campo, "valor": this.valor ,"id_citrix_com": this.id_citrix_com,"clave": clave});

      this.pendientesServicio.guardarCitrixComent(this.datos).subscribe(
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