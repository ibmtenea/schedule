
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ColumnMode } from '@swimlane/ngx-datatable';
import { BitacoraService } from '../services/bitacora.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2';
import { Personas } from 'src/app/models/personas';
import { Lico } from 'src/app/models/lico';
import { Ayuda } from '../models/ayuda';


@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html'
})
export class AyudaComponent implements OnInit {
  
  ayudas= [];


  public showSpinner: boolean = false;

  
  constructor(private spinner: NgxSpinnerService, private bitacoraServicio: BitacoraService) { 

    this.getListaAyuda();
    
  }

  ngOnInit(){
    
  }


  /**
  * recibimos el listado
  */
  getListaAyuda(){   
    this.bitacoraServicio.getListadoAyuda()
    .subscribe( ( respuesta:any ) => {
      this.ayudas=respuesta;
      console.log(this.ayudas);
      });
  }



  recarga() {
    location.reload();
  }

  showLoadingSpinner() {
    this.spinner.show();
  }


}
