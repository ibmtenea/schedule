import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { IncidenciasService } from '../../services/incidencias.service';
import { NgbModalOptions, NgbDateStruct, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cambioscriticos',
  templateUrl: './cambioscriticos.component.html'
})
export class CambioscriticosComponent implements OnInit {

  closeResult: string;
  modalOptions:NgbModalOptions;
  final: Observable<Object>;


  rows = [];
  temp = [];
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  ColumnMode = ColumnMode;
  campo: any;
  id_criti: any;
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
  CritForm = new FormGroup({
    id_persona:new FormControl(''),
    criti_id:new FormControl(''),
    criti_titulo:new FormControl(''),
    criti_score:new FormControl(''),
    criti_riesgo:new FormControl(''),
    criti_inicio:new FormControl(''),
    criti_duracion:new FormControl(''),
    criti_urgente:new FormControl(''),
    criti_afectacion:new FormControl(''),
    criti_responsable:new FormControl(''),
    criti_cio:new FormControl(''), 
    clave_comun:new FormControl(''),

  });
  isSubmittedTurno = false;
  model: NgbDateStruct;
  placement = 'bottom';
  //click fuera del input
  @HostListener('document:click', ['$event'])
  clickout(event) {
    this.ngOnInit();
  }

  constructor(private fb: FormBuilder,private modalService: NgbModal,private incidenciasServicio: IncidenciasService,private translate: TranslateService) { 
    translate.get('Total', { value: 'eeeeeeeeee' })
    .subscribe((res: string) => this.my_messages.totalMessage = res);
    translate.get('No hay resultados para mostrar', { value: '' })
    .subscribe((res: string) => this.my_messages.emptyMessage = res);


    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop',
      size: 'lg' 
    }

    this.CritForm = this.fb.group({
      id_persona: [localStorage.getItem('id_persona'), Validators.required],
      criti_id : ['', Validators.required],
      criti_titulo: ['', Validators.required],
      criti_score : ['', Validators.required],
      criti_riesgo: ['', Validators.required],
      criti_inicio: ['', Validators.required],
      criti_duracion: ['', Validators.required],
      criti_urgente: ['', Validators.required],
      criti_afectacion: ['', Validators.required],
      criti_responsable: ['', Validators.required],
      criti_cio: ['', Validators.required],
      clave_comun: [localStorage.getItem('ccom'), Validators.required],

    });

    /**
    * recibimos el listado
    */
    this.incidenciasServicio.getListadoCriti(data => {
    this.temp = [...data];
    this.rows = data;
    });

  }


  ngOnInit(){
    /**
    * recibimos el listado
    */
    this.incidenciasServicio.getListadoCriti(data => {
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
    this.id_criti = event.target.title;
    const id_persona = localStorage.getItem('id_persona');
    this.valor = event.target.value;
    this.ever =  this.campo,  this.valor,this.id_criti;
    this.datos = JSON.stringify({ "id_persona": id_persona,"campo": this.campo, "valor": this.valor ,"id_criti": this.id_criti});
    if (this.campo == "observaciones" && this.valor.length < 3) {
      Swal.fire({
        title: 'Revise los datos',
        text: 'El campo "observaciones" debe contener como mínimo tres carácteres!!',
        icon: 'error',
      });
      this.ngOnInit();
    } else {
      //todo Ok llamo al servicio
      this.incidenciasServicio.modiRegistroCRITI(this.datos).subscribe(
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
        return d.criti_responsable.toLowerCase().indexOf(val) !== -1 || d.id_criti.toLowerCase().indexOf(val) !== -1 || !val;
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
      const valor = JSON.stringify(this.CritForm.value);
      
      this.incidenciasServicio.guardarCriti( valor ).subscribe( respuesta => {
        Swal.fire({
          title: 'Registro creado',
          text: 'Se ha creado un registro de incidencia ',
          icon: 'success',  
          showConfirmButton : true
        })
      , this.recarga();
        
      });   
    }

    

}
