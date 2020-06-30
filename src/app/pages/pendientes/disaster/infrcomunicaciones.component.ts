import { Component, OnInit, HostListener } from '@angular/core';
import { PendientesService } from '../../../services/pendientes.service';
import { TemasPendientes } from '../../../models/temaspendientes.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Dimod } from '../../../models/dimod';
import { DimodComentarios } from '../../../models/dimodcomentarios';
import { NgbModalOptions, NgbDateStruct, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DataserviceService } from 'src/app/services/dataservice.service';
import { Periodos } from 'src/app/models/periodos';
import { Constantes } from 'src/app/models/constantes.model';


@Component({
  selector: 'app-infrcomunicaciones',
  templateUrl: './infrcomunicaciones.component.html'
})
export class InfrcomunicacionesComponent implements OnInit {


  closeResult: string;
  modalOptions:NgbModalOptions;
  final: Observable<Object>;

  temas:Dimod[] = [];
  comentariostabla:any[] = [];


  campo: any;
  id_dimod: any;
  id_dimod_com: any;
  id_persona: any;
  valor: any;
  editing = {};
  ever: any;
  req: any;
  datos: string;

      // //click fuera del input
      @HostListener('document:click', ['$event'])
      clickout(event) {
        
      }

  DimodForm = new FormGroup({
    id_persona:new FormControl(''),
    clave_comun:new FormControl(''),
    dimod_provider :new FormControl(''),
    dimod_enviroment :new FormControl(''),
    dimod_description :new FormControl(''),
    dimod_component :new FormControl(''),
    dimod_ud_sft: new FormControl(''), 
    dimod_ud_cbs: new FormControl(''), 
    dimod_fo_sft: new FormControl(''), 
    dimod_fo_cbs: new FormControl(''), 
    dimod_sf_sft: new FormControl(''), 
    dimod_sf_cbs: new FormControl(''), 
    dimod_dr_sft: new FormControl(''), 
    dimod_dr_cbs: new FormControl(''), 
    dimod_omp_sft :new FormControl(''),
    dimod_omp_cbs :new FormControl(''),
    dimod_maintenances_plan:new FormControl('')
  });

  isSubmittedTurno = false;
  model: NgbDateStruct;
  placement = 'bottom';
  public periodo: Periodos;
  constructor(private dataService: DataserviceService,private pendientesServicio:PendientesService,private fb: FormBuilder,private modalService: NgbModal,
    private httpClient: HttpClient,private activatedRoute: ActivatedRoute, private router: Router) { 


      
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop',
      size: 'lg' 
    }


    this.dataService.getPeriodo ()
    .subscribe( (respuesta:Periodos) => {
    this.periodo = respuesta;
    this.periodo.pema_fecha = respuesta[0];  
    this.periodo.c_comun = respuesta[0];
    this.periodo.clave_comun = Constantes.ARND+this.periodo.c_comun['clave_comun']+Constantes.BRND;   
    this.DimodForm = this.fb.group({
          id_persona: [localStorage.getItem('id_persona'), Validators.required],
          clave_comun: [this.periodo.clave_comun,Validators.required],
          dimod_provider: ['', Validators.required],
          dimod_enviroment : ['', Validators.required],
          dimod_description : [''],
          dimod_component : [''],
          dimod_ud_sft: [''],
          dimod_ud_cbs: [''],
          dimod_fo_sft: [''],
          dimod_fo_cbs: [''],
          dimod_sf_sft: [''],
          dimod_sf_cbs: [''],
          dimod_dr_sft: [''],
          dimod_dr_cbs: [''],
          dimod_omp_sft: [''],
          dimod_omp_cbs: [''],
          dimod_maintenances_plan : ['']
        });
    });


  }

  ngOnInit(){
    this.getTemasDias();
    this.getComentabla();
  }

  getTemasDias(){   
    this.pendientesServicio.getDimod()
    .subscribe( (respuesta: any) => {
    this.temas=respuesta;
    
      });
  }

  getComentabla(){   
    this.pendientesServicio.getDimodComent()
    .subscribe( (respuesta: any) => {
    this.comentariostabla=respuesta;
    
      });
  }

  

   /**
   * reload pagina al usar sweet alerts etc
   */
  recarga() {
    location.reload();
  }



  /**
   * metodo que actualiza los campos
   */

   updateValue(id_dimod,event, cell, valor, rowIndex:number) {
    this.editing[rowIndex + '-' + cell] = false;
    this.campo = cell;
    this.valor = valor;
    this.id_dimod = id_dimod;
    const id_persona = localStorage.getItem('id_persona');
    const clave = localStorage.getItem('ccom');
    this.ever =  this.campo,  this.valor,this.id_dimod;
    this.datos = JSON.stringify({ "id_persona": id_persona,"campo": this.campo, "valor": this.valor ,"id_dimod": this.id_dimod,"clave": clave});

      this.pendientesServicio.guardarDimod(this.datos).subscribe(
        datos => {
          Swal.fire({
            text: 'Registro actualizado',
            icon: 'success',
            showConfirmButton: false
          })
          // , this.recarga();
          , this.ngOnInit();
        });
    
  }

   /**
   * metodo que actualiza los campos
   */

  updateValueComent(id_dimod_com,event, cell, valor, rowIndex:number) {
    this.editing[rowIndex + '-' + cell] = false;
    this.campo = cell;
    this.valor = valor;
    this.id_dimod_com = id_dimod_com;
    const id_persona = localStorage.getItem('id_persona');
    const clave = localStorage.getItem('ccom');
    this.ever =  this.campo,  this.valor,this.id_dimod_com;
    this.datos = JSON.stringify({ "id_persona": id_persona,"campo": this.campo, "valor": this.valor ,"id_dimod_com": this.id_dimod_com,"clave": clave});

      this.pendientesServicio.guardarDimodComent(this.datos).subscribe(
        datos => {
          Swal.fire({
            text: 'Registro actualizado',
            icon: 'success',
            showConfirmButton: false
          })
          // , this.recarga();
          , this.ngOnInit();
        });
    
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
    const valor = JSON.stringify(this.DimodForm.value);
    this.pendientesServicio.nuevoDimod( valor ).subscribe( respuesta => {
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