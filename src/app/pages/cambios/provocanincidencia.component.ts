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
  selector: 'app-provocanincidencia',
  templateUrl: './provocanincidencia.component.html'
})
export class ProvocanincidenciaComponent implements OnInit {


  closeResult: string;
  modalOptions:NgbModalOptions;
  final: Observable<Object>;

  rows = [];
  temp = [];
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  ColumnMode = ColumnMode;
  campo: any;
  id_cami: any;
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

  CamiForm = new FormGroup({
    id_persona:new FormControl(''),
    cami_id:new FormControl(''),
    cami_titulo:new FormControl(''),
    cami_comentarios:new FormControl(''),
    cami_grupo:new FormControl(''), 
    cami_responsable:new FormControl(''),
    cami_cio:new FormControl(''),
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

    this.CamiForm = this.fb.group({
      id_persona: [localStorage.getItem('id_persona'), Validators.required],
      cami_id : ['', Validators.required],
      cami_titulo : ['', Validators.required],
      cami_comentarios : ['', Validators.required],
      cami_grupo : ['', Validators.required], 
      cami_responsable : ['', Validators.required],
      cami_cio : ['', Validators.required],
      clave_comun: [localStorage.getItem('ccom'), Validators.required],


    });


    /**
    * recibimos el listado
    */
    this.incidenciasServicio.getListadoCami(data => {
    this.temp = [...data];
    this.rows = data;
    });

  }


  ngOnInit(){
    /**
    * recibimos el listado
    */
    this.incidenciasServicio.getListadoCami(data => {
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
    this.id_cami = event.target.title;
    const id_persona = localStorage.getItem('id_persona');
    this.valor = event.target.value;
    this.ever =  this.campo,  this.valor,this.id_cami;
    this.datos = JSON.stringify({ "id_persona": id_persona,"campo": this.campo, "valor": this.valor ,"id_cami": this.id_cami});
    if (this.campo == "observaciones" && this.valor.length < 3) {
      Swal.fire({
        title: 'Revise los datos',
        text: 'El campo "observaciones" debe contener como mínimo tres carácteres!!',
        icon: 'error',
      });
      this.ngOnInit();
    } else {
      //todo Ok llamo al servicio
      this.incidenciasServicio.modiRegistroCAMI(this.datos).subscribe(
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
        return d.cami_responsable.toLowerCase().indexOf(val) !== -1 || d.id_cami.toLowerCase().indexOf(val) !== -1 || !val;
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
      const valor = JSON.stringify(this.CamiForm.value);
      
      this.incidenciasServicio.guardarCami( valor ).subscribe( respuesta => {
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
