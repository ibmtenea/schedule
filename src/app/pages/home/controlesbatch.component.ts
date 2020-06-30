import { Component, OnInit, ViewChild, HostListener } from '@angular/core';

import { HomeService } from '../../services/home.service';
import { TranslateService } from '@ngx-translate/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

import { Periodos } from '../../models/periodos';
import { DataserviceService } from '../../services/dataservice.service';
import { Constantes } from '../../models/constantes.model';
import { ImagenCheck } from 'src/app/models/imagencheck';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ImagenBatch } from 'src/app/models/imagenbatch';
import { NgbModalOptions, NgbDateStruct, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HorariosCoba } from '../../models/horarioscoba';
import { HitosCoba } from '../../models/hitoscoba';
import { Personas } from 'src/app/models/personas';
import { Controlesbatch } from 'src/app/models/controlesbatch';


@Component({
  selector: 'app-controlesbatch',
  templateUrl: './controlesbatch.component.html'
  
})
export class ControlesbatchComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  closeResult: string;
  modalOptions:NgbModalOptions;

hitos: HitosCoba[];
 //horarios: HorariosCoba[];
 horarios: HorariosCoba = new HorariosCoba();


 user:Personas = new Personas();
// selectedHorario: HorariosCoba={ coba_hito1: "",coba_horarioteorico1: ""};
  temp = [];
  rows = [];
  imagenes: ImagenBatch = new ImagenBatch();
  private imageSrc: string = '';
  id_imba:string;
  private PHP_API_SERVER = Constantes.API_SERVER; //URL del servicio
  imagenForm = new FormGroup({
    imba_imagen: new FormControl(''),
    existe: new FormControl(''),
    clave_comun: new FormControl('')
  });
  editing = {};
  my_messages = {
    'emptyMessage': '',
    'totalMessage': ''
  };

  id_persona: any;
  datosFoto: string;
  public periodok: Periodos;
  loading = "mensaje de carga";
  ColumnMode = ColumnMode;
  campo: any;
  id_log: any;
  valor: any;
  ever: any;
  datos: string;
  datosborrado: string;
  id_coba1: any;

    //click fuera del input
    @HostListener('document:click', ['$event'])
    clickout(event) {
      this.ngOnInit();
    }
  
  public periodo: Periodos;
  clave_comun: any;
 

  BatchForm = new FormGroup({

    id_coba1:new FormControl(''),
    coba_hito1:new FormControl(''),
    coba_horarioteorico1:new FormControl(''),
    coba_horarioreal1:new FormControl(''),
    coba_jobs_pendientes1:new FormControl(''),
    coba_incidencias1:new FormControl(''),
    clave_comun:new FormControl('')

  });

  isSubmittedTurno = false;
  model: NgbDateStruct;
  placement = 'bottom';

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private dataService: DataserviceService,
    private homeServicio: HomeService,
    private translate: TranslateService
    ) { 


      
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop',
      size: 'lg' 
    }

    this.BatchForm = this.fb.group({

    coba_hito1: ['', Validators.required],
    coba_horarioteorico1: ['', Validators.required],
    coba_horarioreal1: ['', Validators.required],
    coba_jobs_pendientes1: ['', Validators.required],
    coba_incidencias1: [''],
    clave_comun: [localStorage.getItem('ccom')]

    });


    this.fetch(data => {
      // cache
        this.temp = [...data];
        this.rows = data;

    });

    this.dataService.getPeriodo ()
        .subscribe( (respuesta:Periodos) => {
        this.periodok = respuesta;
        this.periodok.clave_comun = respuesta[0];
        const Clave = Constantes.ARND+this.periodok.clave_comun['clave_comun']+Constantes.BRND;
            this.imagenForm = this.fb.group({
              imba_imagen: ['', Validators.required],
              clave_comun: [Clave, Validators.required],
              existe: [''],
            });
         });
 }


  ngOnInit(){
    this.getImagenActual();
    this.getPeriodoActual();
    this.getUsuario();
    this.hitos = this.homeServicio.getHitosCoba();
  }

  
  getUsuario(){   
    const id_persona = localStorage.getItem('id_persona'); 
    this.dataService.getUserId ( id_persona )
      .subscribe( (resp:Personas) => {
        this.user = resp;
      });
  }



  onSelect(coba_id:any){
    this.homeServicio.getHorariosCoba (coba_id)
    .subscribe( (respuesta:HorariosCoba) => {
    this.horarios = respuesta;  
    });
  }

  
    //cargamos el listado
    fetch(cb) {

      this.dataService.getPeriodo ()
      .subscribe( (respuesta:Periodos) => {
      this.periodok = respuesta;
      this.periodok.clave_comun = respuesta[0];



      if(cb){
        const req = new XMLHttpRequest();


        const Clave = Constantes.ARND+this.periodok.clave_comun['clave_comun']+Constantes.BRND;
        req.open('GET', `${this.PHP_API_SERVER}/ajax/read_batch1.php?clave_comun=${Clave}`);
        //  });

        req.onload = () => {
          cb(JSON.parse(req.response));
        };
        req.send();
      }
    });
    }
  
  
  /**
   * reload pagina al usar sweet alerts etc
   */
  recarga() {
    location.reload();
  }

  getImagenActual(){  
    this.homeServicio.getImgBactch()
    .subscribe((respuesta: ImagenBatch) => {
      this.imagenes = respuesta;
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
  

  
  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;
   
    const clave_comun = this.imagenForm.value.clave_comun;
    this.datosFoto = JSON.stringify({ "clave_comun": clave_comun , "imba_imagen": this.imageSrc});

    this.homeServicio.getImgBactch()
    .subscribe((respuesta: ImagenBatch) => {
      this.imagenes = respuesta;
      const imagenExiste = this.imagenes.imba_imagen;

        if(imagenExiste!=""){
            this.homeServicio.updateRegistroFoto(this.datosFoto).subscribe();
            Swal.fire({
              text: 'Foto actualizada',
              icon: 'success',
              showConfirmButton: false
            })
       //    , this.recarga()
            ;
        } else {
            this.homeServicio.altaRegistroFoto(this.datosFoto).subscribe();
            Swal.fire({
              text: 'Foto añadida',
              icon: 'success',
              showConfirmButton: false
            })
        //   , this.recarga()
            ;
        }

        });

  }



  //actualizacion filtro busqueda
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function(d) {
      return  d.coba_hito1.toLowerCase().indexOf(val) !== -1 || d.coba_horarioteorico1.toLowerCase().indexOf(val) !== -1|| d.coba_jobs_pendientes1.toLowerCase().indexOf(val) !== -1 || !val;
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




  /**
  * actualizacion campos inline
  */
 updateValue1(event, cell, rowIndex) {

  this.editing[rowIndex + '-' + cell] = false;

  this.rows[rowIndex][cell] = event.target.value;
  this.rows = [...this.rows];
  this.campo = cell;
  this.id_coba1 = event.target.title;
  const id_persona = localStorage.getItem('id_persona');
  this.valor = event.target.value;
  this.ever =  this.campo,  this.valor,this.id_coba1;
  this.datos = JSON.stringify({ "id_persona": id_persona,"campo": this.campo, "valor": this.valor ,"id_coba1": this.id_coba1});
  if (this.campo == "observaciones" && this.valor.length < 3) {
    Swal.fire({
      title: 'Revise los datos',
      text: 'El campo "observaciones" debe contener como mínimo tres carácteres!!',
      icon: 'error',
    });
    this.ngOnInit();
  } else {
    //todo Ok llamo al servicio
    this.homeServicio.modiRegistroBacth(this.datos).subscribe(
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



  submitdef(){

    this.isSubmittedTurno = true;
    const valor = JSON.stringify(this.BatchForm.value);
    
    this.homeServicio.guardarBatch( valor ).subscribe( respuesta => {
      Swal.fire({
        title: 'Registro creado',
        text: 'Se ha creado un registro de incidencia ',
        icon: 'success',  
        showConfirmButton : true
      })
   , this.recarga();
      
    });   
  }



  borrarRegistro(id_coba1: string) {
    Swal.fire({
      title: `¿Desea borrar el registro`,
      text: 'Confirme si desea borrar el registro',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(respuesta => {
      if (respuesta.value) {
        this.datosborrado = JSON.stringify({ "id_coba1": id_coba1 });
        this.homeServicio.deleteBatch(this.datosborrado).subscribe();
        Swal.fire({
          title: 'BORRADO',
          text: 'Registro eliminado',
          icon: 'success',
          showConfirmButton: false
        }), this.recarga();
      }
    });
  }



}
