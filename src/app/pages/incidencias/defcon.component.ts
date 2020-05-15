import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { IncidenciasService } from '../../services/incidencias.service';


@Component({
  selector: 'app-defcon',
  templateUrl: './defcon.component.html'
})
export class DefconComponent implements OnInit {


  final: Observable<Object>;

  rows = [];
  temp = [];
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  ColumnMode = ColumnMode;
  campo: any;
  id_defcon: any;
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

  //click fuera del input
  @HostListener('document:click', ['$event'])
  clickout(event) {
    this.ngOnInit();
  }

  constructor(private incidenciasServicio: IncidenciasService,private translate: TranslateService) { 
    translate.get('Total', { value: 'eeeeeeeeee' })
    .subscribe((res: string) => this.my_messages.totalMessage = res);
    translate.get('No hay resultados para mostrar', { value: '' })
    .subscribe((res: string) => this.my_messages.emptyMessage = res);

    /**
    * recibimos el listado
    */
    this.incidenciasServicio.getListado(data => {
    this.temp = [...data];
    this.rows = data;
    });

  }


  ngOnInit(){
    /**
    * recibimos el listado
    */
    this.incidenciasServicio.getListado(data => {
      this.temp = [...data];
      this.rows = data;
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
    this.id_defcon = event.target.title;
    const id_persona = localStorage.getItem('id_persona');
    this.valor = event.target.value;
    this.ever =  this.campo,  this.valor,this.id_defcon;
    this.datos = JSON.stringify({ "id_persona": id_persona,"campo": this.campo, "valor": this.valor ,"id_defcon": this.id_defcon});
    if (this.campo == "observaciones" && this.valor.length < 3) {
      Swal.fire({
        title: 'Revise los datos',
        text: 'El campo "observaciones" debe contener como mínimo tres carácteres!!',
        icon: 'error',
      });
      this.ngOnInit();
    } else {
      //todo Ok llamo al servicio
      this.incidenciasServicio.modiRegistroDEF(this.datos).subscribe(
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
        return d.defcon_fecha.toLowerCase().indexOf(val) !== -1 || d.id_defcon.toLowerCase().indexOf(val) !== -1 || !val;
      });
      // actualizamos las rows
      this.rows = temp;
      // Cuando cambie el filtro, regresa a la primera página.
      this.table.offset = 0;
    }


    

}
