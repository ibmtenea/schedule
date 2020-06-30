import { Component, OnInit, HostListener } from '@angular/core';
import { PendientesService } from '../../../services/pendientes.service';
import { TemasPendientes } from '../../../models/temaspendientes.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Diser } from '../../../models/diser';
import Swal from 'sweetalert2';
import { NgbModalOptions, NgbDateStruct, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Constantes } from 'src/app/models/constantes.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DuracionSemana } from 'src/app/models/duracionsemana';

@Component({
  selector: 'app-ambitofuncional',
  templateUrl: './ambitofuncional.component.html'
})
export class AmbitofuncionalComponent implements OnInit {


  closeResult: string;
  modalOptions:NgbModalOptions;
  final: Observable<Object>;

  temas:Diser[] = [];

  campo: any;
  id_diser: any;
  id_persona: any;
  valor: any;
  editing = {};
  ever: any;
  req: any;
  datos: string;


  duracion: DuracionSemana[] = [];


  DiserForm = new FormGroup({
    id_persona:new FormControl(''),
    diser_id:new FormControl(''),
    diser_tipodr:new FormControl(''),
    diser_fecha_plan:new FormControl(''),
    diser_estado:new FormControl(''),
    id_dire_duracion:new FormControl(''),
    clave_comun:new FormControl(''),

  });
  isSubmittedTurno = false;
  model: NgbDateStruct;
  placement = 'bottom';


      // //click fuera del input
      @HostListener('document:click', ['$event'])
      clickout(event) {
        
      }

   //constantes
   private PHP_API_SERVER = Constantes.API_SERVER; //URL del servicio

  constructor(private fb: FormBuilder,private modalService: NgbModal,private pendientesServicio:PendientesService,
    private httpClient: HttpClient,private activatedRoute: ActivatedRoute, private router: Router) { 


      //cargo diasSemana para los combos select
      httpClient.get<any[]>(this.PHP_API_SERVER + '/ajax/duracion_read.php').subscribe(result => {
        this.duracion = result;
      }, error => console.error(error));
            

    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop',
      size: 'lg' 
    }

    this.DiserForm = this.fb.group({
      id_persona: [localStorage.getItem('id_persona'), Validators.required],
      diser_id: ['', Validators.required], 
      diser_tipodr: ['', Validators.required],
      diser_fecha_plan : ['', Validators.required],
      diser_estado: ['', Validators.required],
      id_dire_duracion: ['', Validators.required],
      clave_comun: [localStorage.getItem('ccom'), Validators.required],
    });


  }

  ngOnInit(){
    this.getTemasDias();
    
  }

  getTemasDias(){   
    this.pendientesServicio.getDiser()
    .subscribe( respuesta => {
    this.temas=respuesta;
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

   updateValue(id_diser,event, cell, valor, rowIndex:number) {
    this.editing[rowIndex + '-' + cell] = false;
    this.campo = cell;
    this.valor = valor;
    this.id_diser = id_diser;
    const id_persona = localStorage.getItem('id_persona');
    const clave = localStorage.getItem('ccom');
    this.ever =  this.campo,  this.valor,this.id_diser;
    this.datos = JSON.stringify({ "id_persona": id_persona,"campo": this.campo, "valor": this.valor ,"id_diser": this.id_diser,"clave": clave});

      this.pendientesServicio.guardarDiser(this.datos).subscribe(
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
    const valor = JSON.stringify(this.DiserForm.value);   
    this.pendientesServicio.nuevoDiser( valor ).subscribe( respuesta => {
      Swal.fire({
        title: 'Registro creado',
        text: 'Se ha creado un registro de incidencia ',
        icon: 'success',  
        showConfirmButton : true
      })
    ,this.recarga();      
    });   
  }



}