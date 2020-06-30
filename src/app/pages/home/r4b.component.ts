import { Component, OnInit, ViewChild, HostListener, AfterViewInit, Input, OnDestroy } from '@angular/core';

import { HomeService } from '../../services/home.service';

import { DatatableComponent } from '@swimlane/ngx-datatable';

import Swal from 'sweetalert2';
import { Constantes } from '../../models/constantes.model';
import { Periodos } from '../../models/periodos';
import { DataserviceService } from '../../services/dataservice.service';



@Component({
  selector: 'app-r4b',
  templateUrl: './r4b.component.html'
  
})
export class R4bComponent implements  OnInit, OnDestroy {


  my_messages = {
    'emptyMessage': '',
    'totalMessage': ''
  };

  // final: Observable<Object>;
 
  rows = [];
  temp = [];
   @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  // ColumnMode = ColumnMode;
  campo: any;
  id_esse: any;
  id_persona: any;
  valor: any;
  ever: any;
  req: any;
  datos: string;
  editing = {};
  clave_comun: any;


  //click fuera del input
  @HostListener('document:click', ['$event'])
  clickout(event) {
    //this.ngOnInit();
  }


  public periodo: Periodos;

  constructor(private homeServicio: HomeService,private dataService: DataserviceService) { 
    /**
    * recibimos el listado
    */
    this.homeServicio.getListado(data => {
    this.temp = [...data];
    this.rows = data;
    });
  }



  ngOnInit(): void{
  this.getPeriodoActual();
  }

  ngOnDestroy() {
    this.homeServicio.unsubscribe();
  }


  /**
   * obtenemos el periodo vigente (el ultimo)
   */

  getPeriodoActual(){   
    this.dataService.getPeriodo ()
     .subscribe( (respuesta:Periodos) => {
     this.periodo = respuesta;
     this.periodo.pema_fecha = respuesta[0];  
     this.periodo.c_comun = respuesta[0];
     this.periodo.clave_comun = Constantes.ARND+this.periodo.c_comun['clave_comun']+Constantes.BRND;
     });
  }

  /**
   * reload pagina al usar sweet alerts etc
   */
  recarga() {
    location.reload();
  }

  
  /**
  * actualizacion campos inline
  */
  updateValue(event, cell, rowIndex) {

    this.editing[rowIndex + '-' + cell] = false;

    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    this.campo = cell;
    this.id_esse = event.target.title;
    this.clave_comun = event.target.id;//clave_comun
    const id_persona = localStorage.getItem('id_persona');
    this.valor = event.target.value;
    this.ever =  this.campo,  this.valor,this.id_esse;
    this.datos = JSON.stringify({ "id_persona": id_persona,"campo": this.campo, "valor": this.valor ,"id_esse": this.id_esse,"clave_comun": this.clave_comun});
    if (this.campo == "observaciones" && this.valor.length < 3) {
      Swal.fire({
        title: 'Revise los datos',
        text: 'El campo "observaciones" debe contener como mínimo tres carácteres!!',
        icon: 'error',
      });
      this.ngOnInit();
    } else {
      //todo Ok llamo al servicio
      this.homeServicio.guardarResumen(this.datos).subscribe(
        datos => {
          Swal.fire({
            text: 'Registro actualizado',
            icon: 'success',
            showConfirmButton: false
          })
          , this.recarga();

        });
    }

  }


    //actualizacion filtro busqueda
    updateFilter(event) {
      console.log(event);
      const val = event.target.value.toLowerCase();
      const temp = this.temp.filter(function (d) {
        return d.esse_servicio.toLowerCase().indexOf(val) !== -1 || d.id_esse.toLowerCase().indexOf(val) !== -1 || !val;
      });
      // actualizamos las rows
      this.rows = temp;
      // Cuando cambie el filtro, regresa a la primera página.
      this.table.offset = 0;
    }






    

}
