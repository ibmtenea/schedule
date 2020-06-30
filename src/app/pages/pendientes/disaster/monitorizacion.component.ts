import { Component, OnInit, HostListener } from '@angular/core';
import { PendientesService } from '../../../services/pendientes.service';
import { TemasPendientes } from '../../../models/temaspendientes.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Hemo } from '../../../models/hemo';
import { NgbModalOptions, NgbDateStruct, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Periodos } from 'src/app/models/periodos';
import { DataserviceService } from 'src/app/services/dataservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Constantes } from 'src/app/models/constantes.model';

@Component({
  selector: 'app-monitorizacion',
  templateUrl: './monitorizacion.component.html'
})
export class MonitorizacionComponent implements OnInit {


  closeResult: string;
  modalOptions:NgbModalOptions;
  final: Observable<Object>;

  temas:Hemo[] = [];
  comentariostabla:any[] = [];

  

  campo: any;
  id_hemo: any;
  id_hemo_com: any;
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
 HemoForm = new FormGroup({
    id_persona:new FormControl(''),
    clave_comun:new FormControl(''),
    hemo_bussinesapp :new FormControl(''),
    hemo_server :new FormControl(''),
    hemo_cpd :new FormControl(''),
    hemo_basculable :new FormControl(''),
    hemo_funcionservidor :new FormControl(''),
    hemo_accion :new FormControl(''),
    hemo_capacidad :new FormControl('')

  });

  isSubmittedTurno = false;
  model: NgbDateStruct;
  placement = 'bottom';
  public periodo: Periodos;

  constructor(private pendientesServicio:PendientesService,
    private dataService: DataserviceService,private fb: FormBuilder,private modalService: NgbModal,
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
      this.HemoForm = this.fb.group({
            id_persona: [localStorage.getItem('id_persona'), Validators.required],
            clave_comun: [this.periodo.clave_comun,Validators.required],
            
            hemo_bussinesapp: ['', Validators.required],
            hemo_server: ['', Validators.required],
            hemo_cpd: [''],
            hemo_basculable: ['', Validators.required],
            hemo_funcionservidor : [''],
            hemo_accion : [''], 
            hemo_capacidad: ['', Validators.required]

          });
      });



  }

  ngOnInit(){
    this.getTemasDias();
    this.getComentabla();
  }

  getTemasDias(){   
    this.pendientesServicio.getHemo()
    .subscribe( (respuesta: any) => {
    this.temas=respuesta;
    
      });
  }

  getComentabla(){   
    this.pendientesServicio.getHemoComent()
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

   updateValue(id_hemo,event, cell, valor, rowIndex:number) {
    this.editing[rowIndex + '-' + cell] = false;
    this.campo = cell;
    this.valor = valor;
    this.id_hemo = id_hemo;
    const id_persona = localStorage.getItem('id_persona');
    const clave = localStorage.getItem('ccom');
    this.ever =  this.campo,  this.valor,this.id_hemo;
    this.datos = JSON.stringify({ "id_persona": id_persona,"campo": this.campo, "valor": this.valor ,"id_hemo": this.id_hemo,"clave": clave});

      this.pendientesServicio.guardarHemo(this.datos).subscribe(
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

  updateValueComent(id_hemo_com,event, cell, valor, rowIndex:number) {
    this.editing[rowIndex + '-' + cell] = false;
    this.campo = cell;
    this.valor = valor;
    this.id_hemo_com = id_hemo_com;
    const id_persona = localStorage.getItem('id_persona');
    const clave = localStorage.getItem('ccom');
    this.ever =  this.campo,  this.valor,this.id_hemo_com;
    this.datos = JSON.stringify({ "id_persona": id_persona,"campo": this.campo, "valor": this.valor ,"id_hemo_com": this.id_hemo_com,"clave": clave});

      this.pendientesServicio.guardarHemoComent(this.datos).subscribe(
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
    const valor = JSON.stringify(this.HemoForm.value);
    this.pendientesServicio.nuevoHemo( valor ).subscribe( respuesta => {
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