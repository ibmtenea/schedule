import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ColumnMode } from '@swimlane/ngx-datatable';
import { BitacoraService } from '../../services/bitacora.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';


@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html'
  
})
export class BitacoraComponent implements OnInit {

  public showSpinner: boolean = false;
  rows = [];
  temp = [];

@ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  ColumnMode = ColumnMode;
  campo: any;
  id_bita: any;
  id_persona: any;
  valor: any;
  ever: any;
  req: any;
  datos: string;
  editing = {};
  my_messages = {
    'emptyMessage': '',
    'totalMessage': ''
  };

  constructor(private spinner: NgxSpinnerService, private bitacoraServicio: BitacoraService) { }

  ngOnInit(){
    this.getBitacora();
  }


    /**
    * recibimos el listado
    */
   getBitacora(){
   this.bitacoraServicio.getListado(data => {
    this.showLoadingSpinner();
    this.temp = [...data];
    this.rows = data;
    });
  }

   //actualizacion filtro busqueda
   updateFilter(event) {
        console.log(event);
        const val = event.target.value.toLowerCase();
        const temp = this.temp.filter(function (d) {
          return d.bita_accion.toLowerCase().indexOf(val) !== -1 || d.bita_clave_comun.toLowerCase().indexOf(val) !== -1 || d.bita_fecha.toLowerCase().indexOf(val) !== -1 || !val;
        });
        // actualizamos las rows
        this.rows = temp;
        // Cuando cambie el filtro, regresa a la primera página.
        this.table.offset = 0;
    }

      
  showLoadingSpinner() {
    this.spinner.show();
  }


}
