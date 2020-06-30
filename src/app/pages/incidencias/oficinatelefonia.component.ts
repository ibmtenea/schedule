import { Component, OnInit, ViewChild, HostListener, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { IncidenciasService } from '../../services/incidencias.service';
import { NgbModalOptions, NgbDateStruct, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Sodi } from '../../models/sodi';
import { Periodos } from '../../models/periodos';
import { DataserviceService } from '../../services/dataservice.service';
import { Constantes } from '../../models/constantes.model';




@Component({
  selector: 'app-oficinatelefonia',
  templateUrl: './oficinatelefonia.component.html'
})
export class OficinatelefoniaComponent implements OnInit {

  closeResult: string;
  modalOptions:NgbModalOptions;
  modalOptionsGrande:NgbModalOptions;
  final: Observable<Object>;
  
    rows = [];
    temp = [];
    @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
    ColumnMode = ColumnMode;
    campo: any;
    id_sodi: any;
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
    private imageSrc: string = '';

    SodiImagenForm= new FormGroup({
      sodi_grafico1:new FormControl(''),
    });
    datosborrado: string;
    SodiForm = new FormGroup({
      id_persona:new FormControl(''),
      clave_comun:new FormControl(''),
      sodi_fecha:new FormControl(''),
      sodi_estado:new FormControl(''),
      sodi_canales:new FormControl(''),
      sodi_estadoplataforma:new FormControl(''),
    });
    isSubmittedTurno = false;
    model: NgbDateStruct;
    placement = 'bottom';
    datosFoto: string;
  datosImagen1: string;
  datosImagen2: string;
 
  showModal: boolean;

  registro: Sodi = new Sodi();
  public periodo: Periodos;
    //click fuera del input
    @HostListener('document:click', ['$event'])
    clickout(event) {
      this.ngOnInit();
    }
  
    constructor(private dataService: DataserviceService,private activatedRoute: ActivatedRoute,private fb: FormBuilder,private modalService: NgbModal,private incidenciasServicio: IncidenciasService,private translate: TranslateService) { 
      translate.get('Total', { value: 'eeeeeeeeee' })
      .subscribe((res: string) => this.my_messages.totalMessage = res);
      translate.get('No hay resultados para mostrar', { value: '' })
      .subscribe((res: string) => this.my_messages.emptyMessage = res);
  


      
      this.modalOptions = {
        backdrop:'static',
        backdropClass:'customBackdrop',
        size: 'lg' 
      }
  
      this.modalOptionsGrande = {
        backdrop:'static',
        backdropClass:'customBackdrop',
        size: 'xl' 
      }
          
      
      this.dataService.getPeriodo ()
      .subscribe( (respuesta:Periodos) => {
      this.periodo = respuesta;
      this.periodo.pema_fecha = respuesta[0];  
      this.periodo.c_comun = respuesta[0];
      this.periodo.clave_comun = Constantes.ARND+this.periodo.c_comun['clave_comun']+Constantes.BRND;
            this.SodiForm = this.fb.group({
              id_persona: [localStorage.getItem('id_persona'), Validators.required],
              sodi_fecha : ['', Validators.required],
              sodi_estado: ['', Validators.required],
              sodi_canales : ['', Validators.required],
              sodi_estadoplataforma: ['', Validators.required],
              clave_comun: [this.periodo.clave_comun,Validators.required],
            });
      });
      /**
      * recibimos el listado
      */
      this.incidenciasServicio.getListadoSoDi(data => {
      this.temp = [...data];
      this.rows = data;
      });




  
    }
  
  
    ngOnInit(){

      this.getPeriodoActual();

      /**
      * recibimos el listado
      */
      this.incidenciasServicio.getListadoSoDi(data => {
        this.temp = [...data];
        this.rows = data;
      });
  

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
      this.id_sodi = event.target.title;
      const id_persona = localStorage.getItem('id_persona');
      this.valor = event.target.value;
      this.ever =  this.campo,  this.valor,this.id_sodi;
      this.datos = JSON.stringify({ "id_persona": id_persona,"campo": this.campo, "valor": this.valor ,"id_sodi": this.id_sodi});
      if (this.campo == "observaciones" && this.valor.length < 3) {
        Swal.fire({
          title: 'Revise los datos',
          text: 'El campo "observaciones" debe contener como mínimo tres carácteres!!',
          icon: 'error',
        });
        this.ngOnInit();
      } else {
        //todo Ok llamo al servicio
        this.incidenciasServicio.modiRegistroSoDi(this.datos).subscribe(
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
          return d.sodi_fecha.toLowerCase().indexOf(val) !== -1 || d.id_sodi.toLowerCase().indexOf(val) !== -1 || !val;
        });
        // actualizamos las rows
        this.rows = temp;
        // Cuando cambie el filtro, regresa a la primera página.
        this.table.offset = 0;
      }

  



      //modal que abre la visualizacion de la imagen
      open2(sodi,id_sodi) {
        this.incidenciasServicio.getImgSodi(id_sodi)
        .subscribe((respuesta: Sodi) => {
          this.registro = respuesta;
        });
  
        this.modalService.open(sodi, this.modalOptionsGrande).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }



      
    open(sodi) {
      this.modalService.open(sodi, this.modalOptions).result.then((result) => {
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




    handleUpload1(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const id_sodi =  event.target.title;
        const clave_comun =  event.target.id;
      this.datosImagen1 = JSON.stringify({ "id_sodi": id_sodi, "clave_comun": clave_comun,"sodi_grafico1": reader.result });
        this.incidenciasServicio.guardarSodiImagen1( this.datosImagen1 ).subscribe( respuesta => {
          Swal.fire({
            title: 'Imagen actualizada',
            text: 'la imagen ha sido actualizada ',
            icon: 'success',  
            showConfirmButton : false
          })
          , this.recarga();
        });  
      };
    }

    handleUpload2(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const id_sodi =  event.target.title;
        const clave_comun =  event.target.id;
      this.datosImagen2 = JSON.stringify({ "id_sodi": id_sodi, "clave_comun": clave_comun,"sodi_grafico2": reader.result });
        this.incidenciasServicio.guardarSodiImagen2( this.datosImagen2 ).subscribe( respuesta => {
          Swal.fire({
            title: 'Imagen actualizada',
            text: 'la imagen ha sido actualizada ',
            icon: 'success',  
            showConfirmButton : false
          })
          , this.recarga();
        });  
      };
    }


    submitdef(){
      this.isSubmittedTurno = true;
      const valor = JSON.stringify(this.SodiForm.value);  
      this.incidenciasServicio.guardarSodi( valor ).subscribe( respuesta => {
        Swal.fire({
          title: 'Registro creado',
          text: 'Se ha creado un registro de incidencia ',
          icon: 'success',  
          showConfirmButton : true
        })
        //, this.recarga();
      });  
    }

    


    
   borrarRegistroImagen ( id_sodi,sodi_grafico1,sodi_grafico2,clave_comun){

            this.datosborrado = JSON.stringify({ "id_sodi": id_sodi,"clave_comun": clave_comun,"sodi_grafico1": sodi_grafico1 ,"sodi_grafico2": sodi_grafico2 });
            this.incidenciasServicio.delete( this.datosborrado ).subscribe();

            Swal.fire({
              title: 'Imagen eliminada',
              text: 'imagen eliminada',
              icon: 'success',  
              showConfirmButton : false
            })
            //,this.recarga();  
    }




  }
  