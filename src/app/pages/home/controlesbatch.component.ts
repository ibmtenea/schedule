import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { RB4 } from 'src/app/models/rb4';
import { HomeService } from 'src/app/services/home.service';
import { TranslateService } from '@ngx-translate/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Controlesbatch } from 'src/app/models/controlesbatch';


@Component({
  selector: 'app-controlesbatch',
  templateUrl: './controlesbatch.component.html'
  
})
export class ControlesbatchComponent implements OnInit {

  final: Observable<Object>;

  rows = [];
  temp = [];
  rows2 = [];
  temp2 = [];
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  ColumnMode = ColumnMode;
  campo: any;
  id_coba1: any;
  id_coba2: any;
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

  loading = "mensaje de carga"
  // //click fuera del input
  // @HostListener('document:click', ['$event'])
  // clickout(event) {
  //   this.ngOnInit();
  // }

  constructor(private homeServicio: HomeService,private translate: TranslateService) { 
    translate.get('Total', { value: 'eeeeeeeeee' })
    .subscribe((res: string) => this.my_messages.totalMessage = res);
    translate.get('No hay resultados para mostrar', { value: '' })
    .subscribe((res: string) => this.my_messages.emptyMessage = res);




 }


  ngOnInit(){
 
      /**
      * recibimos el listado de batch 1
      */
      this.homeServicio.getListadoBatch1(data => {
      this.temp = [...data];
      this.rows = data;
      });
  
      /**
      * recibimos el listado de batch 2
      */
     this.homeServicio.getListadoBatch2(data2 => {
      this.temp2 = [...data2];
      this.rows2 = data2;
      });
   

  }

  /**
   * reload pagina al usar sweet alerts etc
   */
  recarga() {
    location.reload();
  }

  
  /**
  * actualizacion campos inline batch 1
  */
  updateValue1(event, cell, rowIndex) {
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    this.campo = cell;
    this.id_coba1 = event.target.title;
    const clave = localStorage.getItem('ccom');
    const id_persona = localStorage.getItem('id_persona');
    this.valor = event.target.value;
    this.ever =  this.campo,  this.valor,this.id_coba1;
    this.datos = JSON.stringify({ "id_persona": id_persona,"campo": this.campo, "valor": this.valor ,"id_coba1": this.id_coba1,"clave": clave});
   
    
    
    if (this.campo == "observaciones" && this.valor.length < 3) {
          Swal.fire({
            title: 'Revise los datos',
            text: 'El campo "observaciones" debe contener como mínimo tres carácteres!!',
            icon: 'error',
          });
          this.ngOnInit();
    } else {

      if ((this.campo == "coba_horarioteorico1") || (this.campo == "coba_horarioreal1")) {   
        
        var patronHora = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        var horaResult = patronHora.test(this.valor);
        if (horaResult == false) {
          Swal.fire({
            text: 'Los campos Hora deben cumplir con el formato adecuado',
            icon: 'error',
            showConfirmButton: true
          });
        }  else {

          //todo Ok llamo al servicio
          this.homeServicio.modiRegistroBacth(this.datos).subscribe(
            datos => {
              Swal.fire({
                text: 'Registro actualizado',
                icon: 'success',
                showConfirmButton: false
              }), this.recarga();
    
            });
    
          }

      } else {

      //todo Ok llamo al servicio
      this.homeServicio.modiRegistroBacth(this.datos).subscribe(
        datos => {
          Swal.fire({
            text: 'Registro actualizado',
            icon: 'success',
            showConfirmButton: false
          }), this.recarga();

        });

      }

    }

  }


  /**
  * actualizacion campos inline batch 1
  */
 updateValue2(event, cell, rowIndex) {
  this.editing[rowIndex + '-' + cell] = false;
  this.rows[rowIndex][cell] = event.target.value;
  this.rows = [...this.rows];
  this.campo = cell;
  this.id_coba2 = event.target.title;
  const clave = localStorage.getItem('ccom');
  const id_persona = localStorage.getItem('id_persona');
  this.valor = event.target.value;
  this.ever =  this.campo,  this.valor,this.id_coba2;
  this.datos = JSON.stringify({ "id_persona": id_persona,"campo": this.campo, "valor": this.valor ,"id_coba2": this.id_coba2,"clave": clave});
  if (this.campo == "observaciones" && this.valor.length < 3) {
    Swal.fire({
      title: 'Revise los datos',
      text: 'El campo "observaciones" debe contener como mínimo tres carácteres!!',
      icon: 'error',
    });
    this.ngOnInit();
  } else {






 if ((this.campo == "coba_horarioteorico2") || (this.campo == "coba_horarioreal2")) {   
        
        var patronHora = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        var horaResult = patronHora.test(this.valor);
        if (horaResult == false) {
          Swal.fire({
            text: 'Los campos Hora deben cumplir con el formato adecuado',
            icon: 'error',
            showConfirmButton: true
          });
        }  else {

          //todo Ok llamo al servicio
          this.homeServicio.modiRegistroBacth2(this.datos).subscribe(
            datos => {
              Swal.fire({
                text: 'Registro actualizado',
                icon: 'success',
                showConfirmButton: false
              })
              , this.recarga();
    
            });
    
          }

      } else {

      //todo Ok llamo al servicio
      this.homeServicio.modiRegistroBacth2(this.datos).subscribe(
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

}


  //actualizacion filtro busqueda batch 1
    updateFilterBatch1(event) {
      console.log(event);
      const val = event.target.value.toLowerCase();
      const temp = this.temp.filter(function (d) {
        return d.coba_hito1.toLowerCase().indexOf(val) !== -1 ||
               d.coba_fecha1.toLowerCase().indexOf(val) !== -1 || 
               d.id_coba1.toLowerCase().indexOf(val) !== -1 || 
        !val;
      });
      // actualizamos las rows
      this.rows = temp;
      // Cuando cambie el filtro, regresa a la primera página.
      this.table.offset = 0;
   }


    //actualizacion filtro busqueda batch 2
     updateFilterBatch2(event) {
      console.log(event);
      const val = event.target.value.toLowerCase();
      const temp = this.temp.filter(function (d) {
        return d.coba_hito1.toLowerCase().indexOf(val) !== -1 ||
               d.coba_fecha1.toLowerCase().indexOf(val) !== -1 || 
               d.id_coba1.toLowerCase().indexOf(val) !== -1 || 
        !val;
      });
      // actualizamos las rows
      this.rows = temp;
      // Cuando cambie el filtro, regresa a la primera página.
      this.table.offset = 0;
  }

    

}
