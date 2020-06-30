import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ColumnMode } from '@swimlane/ngx-datatable';
import { BitacoraService } from '../../services/bitacora.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2';
import { Personas } from 'src/app/models/personas';
import { Lico } from 'src/app/models/lico';


@Component({
  selector: 'app-listapersonasmail',
  templateUrl: './listapersonasmail.component.html'
  
})
export class ListaPersonasMailComponent implements OnInit {

  public showSpinner: boolean = false;
  rows = [];
  temp = [];

@ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  ColumnMode = ColumnMode;
  campo: any;
  id_persona: any;
  id_lico: any;
  valor: any;
  ever: any;
  req: any;
  datos: string;
  editing = {};
  my_messages = {
    'emptyMessage': '',
    'totalMessage': ''
  };
  datosborrado: string;
  datosdesactivar: string;
  datosactivar:string;
  constructor(private spinner: NgxSpinnerService, private bitacoraServicio: BitacoraService) { }

  ngOnInit(){
    this.getBitacora();
  }


    /**
    * recibimos el listado
    */
   getBitacora(){
   this.bitacoraServicio.getListadoLico(data => {
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
          return d.lico_nombre.toLowerCase().indexOf(val) !== -1 || d.lico_activo.toLowerCase().indexOf(val) !== -1 ||  !val;
        });
        // actualizamos las rows
        this.rows = temp;
        // Cuando cambie el filtro, regresa a la primera página.
        this.table.offset = 0;
    }

 //reload pagina al usar sweet alerts etc
  recarga() {
    location.reload();
  }


    //eliminar registro      
  borrarRegistro(registro: Personas, i: string) {

    Swal.fire({
      title: `¿Desea borrar el usuario ${registro.nombres}`,
      text: 'Confirme si desea borrar el registro',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true

    }).then(respuesta => {
      if (respuesta.value) {

        this.datosborrado = JSON.stringify({ "id_persona": registro.id_persona });
        this.bitacoraServicio.delete(this.datosborrado).subscribe();

        Swal.fire({
          title: registro.nombres,
          text: 'Registro eliminado',
          icon: 'success',
          showConfirmButton: false
        })
          , this.recarga();

      }
    });
  }





      activar(registro: Lico) {
        this.datosactivar = JSON.stringify({ "id_lico": registro.id_lico });
        this.bitacoraServicio.activar(this.datosactivar).subscribe(data => {
        }, error => {
         console.log('error');
        }), this.recarga();           
      }

      desactivar(registro: Lico) {
        this.datosdesactivar = JSON.stringify({ "id_lico": registro.id_lico });
        this.bitacoraServicio.desactivar(this.datosdesactivar).subscribe(data => {
        }, error => {
         console.log('error');
        }), this.recarga();          
      }




  showLoadingSpinner() {
    this.spinner.show();
  }


}
