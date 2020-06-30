import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ColumnMode } from '@swimlane/ngx-datatable';
import { BitacoraService } from '../../services/bitacora.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2';
import { Personas } from '../../models/personas';
import { IncidenciasApp } from '../../models/incidencias';
import { Constantes } from '../../models/constantes.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IncidenciasAppService } from '../../services/incidenciasapp.service';


@Component({
  selector: 'app-incidenciasapp',
  templateUrl: './incidenciasapp.component.html'
})
export class IncidenciasappComponent implements OnInit {

public showSpinner: boolean = false;

   
  personas:Personas[] = [];
  issue: IncidenciasApp = new IncidenciasApp();
  editing = {};
  rows = [];
  temp = [];
  private PHP_API_SERVER = Constantes.API_SERVER; //URL del servicio


  my_messages = {
    'emptyMessage': '',
    'totalMessage': ''
  };

  numero: number;
  final: Observable<Object>;
  dregistro = null;
  datoregistro = {
    id_inci: null,
    inci_fecha: null,
    inci_enunciado: null,
    issueg: null,
    descripcion_accion: null,
    hour: null,
    estatus: null,
    status: null,
    observaciones: null
  }

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  ColumnMode = ColumnMode;
  campo: any;
  id_log: any;
  valor: any;
  ever: any;
  datos: string;
  datosborrado: string;


  constructor(private spinner: NgxSpinnerService,private httpClient: HttpClient, private incidenciasService: IncidenciasAppService) {
        this.fetch(data => {
          // cache
            this.temp = [...data];
            this.rows = data;
        });


  }

  //el ngoninit nos servira para recargar en caso de error de validacion
  ngOnInit(){

    /** spinner starts on init */
    this.spinner.show();
 
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 2000);



    this.fetch(data => {
        this.temp = [...data];
        this.rows = data;
      });
  }

  //reload pagina al usar sweet alerts etc
  recarga(){ 
      location.reload();
  }

  //cargamos el listado
  fetch(cb) {
    if(cb){
      const req = new XMLHttpRequest();
      req.open('GET', `${this.PHP_API_SERVER}/ajax/read_incidencias.php`);
      req.onload = () => {
        cb(JSON.parse(req.response));
      };
      req.send();
    }
  }




  //  //eliminar registro      
  //  borrarRegistro ( registro: IncidenciasApp, i:string){

  //   Swal.fire({
  //       title: `¿Desea borrar el registro histórico ${registro.tarea}`,
  //       text: 'Confirme si desea borrar el registro',
  //       icon: 'question',
  //       showConfirmButton: true,
  //       showCancelButton: true

  //   }).then( respuesta => {
  //       if ( respuesta.value ) {
  //           this.datosborrado = JSON.stringify({ "tarea": registro.tarea, "id_tarea": registro.id_tarea });
  //           this.incidenciasService.delete( this.datosborrado ).subscribe();

  //           Swal.fire({
  //             title: registro.tarea,
  //             text: 'Registro eliminado',
  //             icon: 'success',  
  //             showConfirmButton : false
  //           }),this.recarga();  

  //       }
  //     });
  //   }



  //actualizacion filtro busqueda
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function(d) {
      return  d.inci_fecha.toLowerCase().indexOf(val) !== -1 || d.inci_resuelta.toLowerCase().indexOf(val) !== -1|| d.inci_fecha_resuelta.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // actualizamos las rows
    this.rows = temp;
    // Cuando cambie el filtro, regresa a la primera página.
    this.table.offset = 0;
  }


}