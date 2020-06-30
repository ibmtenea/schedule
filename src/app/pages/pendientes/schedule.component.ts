import { Component, OnInit, HostListener } from '@angular/core';
import { PendientesService } from '../../services/pendientes.service';
import { TemasPendientes } from '../../models/temaspendientes.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Schedule } from '../../models/schedule';
import Swal from 'sweetalert2';
import { NgbModalOptions, NgbDateStruct, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Constantes } from 'src/app/models/constantes.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DiasSemana } from 'src/app/models/diassemanaschedule';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html'
})
export class ScheduleComponent implements OnInit {

  closeResult: string;
  modalOptions:NgbModalOptions;
  final: Observable<Object>;


  temas:Schedule[] = [];

  campo: any;
  id_pendi: any;
  id_persona: any;
  valor: any;
  editing = {};
  ever: any;
  req: any;
  datos: string;

  diasSemana: DiasSemana[] = [];


  CamiForm = new FormGroup({
    id_persona:new FormControl(''),
    id_pendi_dias:new FormControl(''),
    pendi_ticket:new FormControl(''),
    pendi_aplicaciones:new FormControl(''),
    pendi_descripcion:new FormControl(''),
    pendi_analisis:new FormControl(''),
    pendi_ultiactual:new FormControl(''),
    pendi_owner:new FormControl(''),
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
    private httpClient: HttpClient,private activatedRoute: ActivatedRoute, private router: Router
    ) { 

    //cargo diasSemana para los combos select
    httpClient.get<any[]>(this.PHP_API_SERVER + '/ajax/dias_semana_schedule_read.php').subscribe(result => {
      this.diasSemana = result;
    }, error => console.error(error));
        

    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop',
      size: 'lg' 
    }

    this.CamiForm = this.fb.group({
      id_persona: [localStorage.getItem('id_persona'), Validators.required],
      id_pendi_dias: ['', Validators.required],
      pendi_ticket: ['', Validators.required],
      pendi_aplicaciones: ['', Validators.required],
      pendi_descripcion: ['', Validators.required],
      pendi_analisis: ['', Validators.required],
      pendi_ultiactual: ['', Validators.required],
      pendi_owner: ['', Validators.required],
      clave_comun: [localStorage.getItem('ccom'), Validators.required],
    });


  }

  ngOnInit(){
    this.getTemasDias();
    
  }

  getTemasDias(){   
    this.pendientesServicio.getDiasTemas()
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

   updateValue(id_pendi,event, cell, valor, rowIndex:number) {
    this.editing[rowIndex + '-' + cell] = false;
    this.campo = cell;
    this.valor = valor;
    this.id_pendi = id_pendi;
    const id_persona = localStorage.getItem('id_persona');
    const clave = localStorage.getItem('ccom');
    this.ever =  this.campo,  this.valor,this.id_pendi;
    this.datos = JSON.stringify({ "id_persona": id_persona,"campo": this.campo, "valor": this.valor ,"id_pendi": this.id_pendi,"clave": clave});



      this.pendientesServicio.guardarSchedule(this.datos).subscribe(
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
    const valor = JSON.stringify(this.CamiForm.value);
    
    this.pendientesServicio.guardarPendi( valor ).subscribe( respuesta => {
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
