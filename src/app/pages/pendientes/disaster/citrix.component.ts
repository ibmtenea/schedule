import { Component, OnInit, HostListener } from '@angular/core';
import { PendientesService } from '../../../services/pendientes.service';
import { TemasPendientes } from '../../../models/temaspendientes.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Citrix } from '../../../models/citrix';
import { NgbModalOptions, NgbDateStruct, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Periodos } from 'src/app/models/periodos';
import { DataserviceService } from 'src/app/services/dataservice.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Constantes } from 'src/app/models/constantes.model';

@Component({
  selector: 'app-citrix',
  templateUrl: './citrix.component.html'
  
})
export class CitrixComponent implements OnInit {

  
  closeResult: string;
  modalOptions:NgbModalOptions;
  final: Observable<Object>;


  temas:Citrix[] = [];
  comentariostabla:any[] = [];


  campo: any;
  id_citrix: any;
  id_citrix_com: any;
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
      CitrixForm = new FormGroup({
        id_persona:new FormControl(''),
        clave_comun:new FormControl(''),
        citrix_environement: new FormControl(''),
        citrix_descripcion : new FormControl(''),
        citrix_component   : new FormControl(''),
        citrix_ud_sfb : new FormControl(''),
        citrix_ud_cbs : new FormControl(''),
        citrix_ud_colt: new FormControl(''),
        citrix_fo_sfb : new FormControl(''),
        citrix_fo_cbs : new FormControl(''),
        citrix_fo_colt: new FormControl(''),
        citrix_sf_sfb : new FormControl(''),
        citrix_sf_cbs : new FormControl(''),
        citrix_sf_colt: new FormControl(''),
        citrix_dr_sfb : new FormControl(''),
        citrix_dr_cbs : new FormControl(''),
        citrix_dr_colt: new FormControl('')
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
    this.CitrixForm = this.fb.group({
          id_persona: [localStorage.getItem('id_persona'), Validators.required],
          clave_comun: [this.periodo.clave_comun,Validators.required],
          citrix_environement : ['', Validators.required],
          citrix_descripcion : ['', Validators.required],
          citrix_component : [''],
          citrix_ud_sfb : [''],
          citrix_ud_cbs : [''],
          citrix_ud_colt: [''], 
          citrix_fo_sfb : [''],
          citrix_fo_cbs : [''],
          citrix_fo_colt: [''], 
          citrix_sf_sfb : [''],
          citrix_sf_cbs : [''],
          citrix_sf_colt: [''], 
          citrix_dr_sfb : [''],
          citrix_dr_cbs : [''],
          citrix_dr_colt: ['']

        });
    });
  }

  ngOnInit(){
    this.getTemasDias();
    this.getComentabla();
  }

  getTemasDias(){   
    this.pendientesServicio.getCitrix()
    .subscribe( (respuesta: any) => {
    this.temas=respuesta;
    
      });
  }

  getComentabla(){   
    this.pendientesServicio.getCitrixComent()
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

   updateValue(id_citrix,event, cell, valor, rowIndex:number) {
    this.editing[rowIndex + '-' + cell] = false;
    this.campo = cell;
    this.valor = valor;
    this.id_citrix = id_citrix;
    const id_persona = localStorage.getItem('id_persona');
    const clave = localStorage.getItem('ccom');
    this.ever =  this.campo,  this.valor,this.id_citrix;
    this.datos = JSON.stringify({ "id_persona": id_persona,"campo": this.campo, "valor": this.valor ,"id_citrix": this.id_citrix,"clave": clave});

      this.pendientesServicio.guardarCitrix(this.datos).subscribe(
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

  updateValueComent(id_citrix_com,event, cell, valor, rowIndex:number) {
    this.editing[rowIndex + '-' + cell] = false;
    this.campo = cell;
    this.valor = valor;
    this.id_citrix_com = id_citrix_com;
    const id_persona = localStorage.getItem('id_persona');
    const clave = localStorage.getItem('ccom');
    this.ever =  this.campo,  this.valor,this.id_citrix_com;
    this.datos = JSON.stringify({ "id_persona": id_persona,"campo": this.campo, "valor": this.valor ,"id_citrix_com": this.id_citrix_com,"clave": clave});

      this.pendientesServicio.guardarCitrixComent(this.datos).subscribe(
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
    const valor = JSON.stringify(this.CitrixForm.value);
    this.pendientesServicio.nuevoCitrix( valor ).subscribe( respuesta => {
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