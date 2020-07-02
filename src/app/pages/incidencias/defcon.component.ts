import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { IncidenciasService } from '../../services/incidencias.service';
import {NgbModal, ModalDismissReasons, NgbModalOptions, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataserviceService } from 'src/app/services/dataservice.service';
import { Personas } from 'src/app/models/personas';

@Component({
  selector: 'app-defcon',
  templateUrl: './defcon.component.html'
})
export class DefconComponent implements OnInit {

  user:Personas = new Personas();
  closeResult: string;
  modalOptions:NgbModalOptions;
  final: Observable<Object>;
  datosborradoDef: string;
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

  DefconForm = new FormGroup({
    clave_comun:new FormControl(''),
    defcon_fecha:new FormControl(''),
    defcon_id:new FormControl(''),
    defcon_inicio_incidencia:new FormControl(''),
    defcon_final_incidencia:new FormControl(''),
    defcon_ticket :new FormControl(''),
    defcon_aplicaciones_impactadas :new FormControl(''),
    defcon_descripcion :new FormControl(''),
    defcon_ultima_actualizacion :new FormControl(''),
    defcon_resolutores :new FormControl(''), 
    defcon_estado:new FormControl(''),
  });
  isSubmittedTurno = false;
  model: NgbDateStruct;
  placement = 'bottom';
  datosborrado: string;
  //click fuera del input
    //click fuera del input
    @HostListener('document:click', ['$event'])
    clickout(event) {
      this.ngOnInit();
    }
  
  constructor( private dataService: DataserviceService,private fb: FormBuilder,private modalService: NgbModal,private incidenciasServicio: IncidenciasService,private translate: TranslateService) { 
    translate.get('Total', { value: 'eeeeeeeeee' })
    .subscribe((res: string) => this.my_messages.totalMessage = res);
    translate.get('No hay resultados para mostrar', { value: '' })
    .subscribe((res: string) => this.my_messages.emptyMessage = res);

    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop',
      size: 'lg' 
    }

    this.DefconForm = this.fb.group({
      defcon_id:[''],
      id_persona: [localStorage.getItem('id_persona')],
      defcon_inicio_incidencia: [''],
      defcon_fecha:[''],
      clave_comun: [localStorage.getItem('ccom')],
      defcon_final_incidencia:[''],
      defcon_ticket:[''],
      defcon_aplicaciones_impactadas:[''],
      defcon_descripcion:[''],
      defcon_ultima_actualizacion:[''],
      defcon_resolutores:[''],
      defcon_estado:[''],

    });
    /**
    * recibimos el listado
    */
    this.incidenciasServicio.getListado(data => {
    this.temp = [...data];
    this.rows = data;
    });

  }


  ngOnInit(){
    // /**
    // * recibimos el listado
    // */
    // this.incidenciasServicio.getListado(data => {
    //   this.temp = [...data];
    //   this.rows = data;
    // });
this.getUsuario();

  }

  getUsuario(){   
    const id_persona = localStorage.getItem('id_persona'); 
    this.dataService.getUserId ( id_persona )
      .subscribe( (resp:Personas) => {
        this.user = resp;
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
    const clave = localStorage.getItem('ccom');
    const id_persona = localStorage.getItem('id_persona');
    this.valor = event.target.value;
    this.ever =  this.campo,  this.valor,this.id_defcon;
    this.datos = JSON.stringify({ "id_persona": id_persona,"campo": this.campo, "valor": this.valor ,"id_defcon": this.id_defcon,"clave": clave});
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
 
      const val = event.target.value.toLowerCase();
      const temp = this.temp.filter(function (d) {
        return d.defcon_fecha.toLowerCase().indexOf(val) !== -1 || d.id_defcon.toLowerCase().indexOf(val) !== -1 || !val;
      });
      // actualizamos las rows
      this.rows = temp;
      // Cuando cambie el filtro, regresa a la primera página.
      this.table.offset = 0;
    }


    
    open(tiket) {
      this.modalService.open(tiket, this.modalOptions).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
    
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }



    submitdef(){

      this.isSubmittedTurno = true;
      const valordefcon = JSON.stringify(this.DefconForm.value);
      
      this.incidenciasServicio.guardarDefcon( valordefcon ).subscribe( respuesta => {
        Swal.fire({
          title: 'Registro creado',
          text: 'Se ha creado un registro de incidencia ',
          icon: 'success',  
          showConfirmButton : true
        })
      , this.recarga();
        
      });   
    }


    borrarRegistro(registro: any, id_defcon:string) {

      Swal.fire({
        title: `¿Desea borrar el registro`,
        text: 'Confirme si desea borrar el registro',
        icon: 'question',
        showConfirmButton: true,
        showCancelButton: true
      }).then(respuesta => {
        if (respuesta.value) {

          this.datosborrado = JSON.stringify({ "id_defcon": id_defcon });
          this.incidenciasServicio.deleteDefcon(this.datosborrado).subscribe();
          Swal.fire({
            title: 'BORRADO',
            text: 'Registro eliminado',
            icon: 'success',
            showConfirmButton: false
          })
          , this.recarga();
        }
      });
    }




}
