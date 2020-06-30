import { Component, OnInit, HostListener } from '@angular/core';
import { PendientesService } from '../../../../services/pendientes.service';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CambiosReporte } from '../../../../models/cambiosreporte';
import Swal from 'sweetalert2';
import { ReporteGlogalService } from 'src/app/services/reporteglobal.service';
import { TurnosReporte } from 'src/app/models/turnosreporte';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Periodos } from 'src/app/models/periodos';
import { DataserviceService } from 'src/app/services/dataservice.service';
import { Constantes } from 'src/app/models/constantes.model';

@Component({
  selector: 'app-cambiosaplicados',
  templateUrl: './cambiosaplicados.component.html',
  styleUrls: ['./cambiosaplicados.component.css']
})
export class CambiosaplicadosComponent implements OnInit {

  closeResult: string;
  modalOptions:NgbModalOptions;
  cambios:CambiosReporte[] = [];
  turnos:TurnosReporte[] = [];
  id_care: any;
  id_ture: any;
  id_persona: any;

  isSubmittedTike = false;
  isSubmittedTurno = false;


  campo: any;
  valor: any;
  editing = {};
  ever: any;
  req: any;
  datos: string;

  careTiketForm = new FormGroup({
    id_persona: new FormControl(''),
    care_ticket: new FormControl(''),
    care_fecha: new FormControl(''),
    care_titulo: new FormControl(''),
    care_horacomienzo: new FormControl(''),
    care_horaresolucion: new FormControl(''),
    care_estado: new FormControl(''),
    care_comentarios: new FormControl(''),
    clave_comun: new FormControl('')
  });

  tureTiketForm = new FormGroup({
    id_persona:new FormControl(''),
    ture_texto: new FormControl(''),
    ture_titulo: new FormControl('')
  });


      // //click fuera del input
      @HostListener('document:click', ['$event'])
      clickout(event) {
        
      }
  public periodor: Periodos;
  constructor(
    private fb: FormBuilder,private dataService: DataserviceService,
    private reporteServicio:ReporteGlogalService,
    private modalService: NgbModal,
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router
    
    ) { 
      this.modalOptions = {
        backdrop:'static',
        backdropClass:'customBackdrop',
        size: 'lg' 
      }

      this.dataService.getPeriodo ()
      .subscribe( (respuesta:Periodos) => {
      this.periodor = respuesta;
      this.periodor.clave_comun = respuesta[0];
      const Clave = Constantes.ARND+this.periodor.clave_comun['clave_comun']+Constantes.BRND;
            this.careTiketForm = this.fb.group({
              id_persona: ['', Validators.required],
              care_ticket: ['', Validators.required],
              care_fecha: ['', Validators.required],
              care_titulo: ['', Validators.required],
              care_horacomienzo: ['', Validators.required],
              care_horaresolucion: ['', Validators.required],
              care_estado: ['', Validators.required],
              care_comentarios: ['', Validators.required],
              clave_comun: [Clave, Validators.required]
            });
            this.tureTiketForm = this.fb.group({
              id_persona: ['', Validators.required],
              ture_texto: ['', Validators.required],
              ture_titulo:['', Validators.required],
              clave_comun: [Clave, Validators.required]
            });
      });
  }

  ngOnInit(){
    this.getcambiosCheck();
    this.getcambiosTure();
  }

  getcambiosCheck(){     
    this.dataService.getPeriodo ()
    .subscribe( (respuesta:Periodos) => {
    this.periodor = respuesta;
    this.periodor.clave_comun = respuesta[0];
    const Clave = Constantes.ARND+this.periodor.clave_comun['clave_comun']+Constantes.BRND;
      this.reporteServicio.getCheckcambios(Clave)
      .subscribe( respuesta => {
      this.cambios=respuesta;
        });
    });
  }
  
  getcambiosTure(){   
    this.dataService.getPeriodo ()
    .subscribe( (respuesta:Periodos) => {
    this.periodor = respuesta;
    this.periodor.clave_comun = respuesta[0];
    const Clave = Constantes.ARND+this.periodor.clave_comun['clave_comun']+Constantes.BRND;
      this.reporteServicio.getTurecambios(Clave)
      .subscribe( respuesta => {
      this.turnos=respuesta;
        });
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

   updateValue(id_care,event, cell, valor, rowIndex:number) {
    this.editing[rowIndex + '-' + cell] = false;
    this.campo = cell;
    this.valor = valor;
    this.id_care = id_care;
    const id_persona = localStorage.getItem('id_persona');
    this.dataService.getPeriodo ()
    .subscribe( (respuesta:Periodos) => {
    this.periodor = respuesta;
    this.periodor.clave_comun = respuesta[0];
    const Clave = Constantes.ARND+this.periodor.clave_comun['clave_comun']+Constantes.BRND;
        this.ever =  this.campo,  this.valor,this.id_care;
        this.datos = JSON.stringify({ "id_persona": id_persona,"campo": this.campo, "valor": this.valor ,"id_care": this.id_care,"clave": Clave});
        this.reporteServicio.guardarCheckcambios(this.datos).subscribe(
            datos => {
              Swal.fire({
                text: 'Registro actualizado',
                icon: 'success',
                showConfirmButton: false
              })
              // , this.recarga();
              , this.ngOnInit();
            }); 
    });


  }


  
  updateValueTurnos(id_ture,event, cell, valor, rowIndex:number) {
    this.editing[rowIndex + '-' + cell] = false;
    this.campo = cell;
    this.valor = valor;
    this.id_ture = id_ture;
    const id_persona = localStorage.getItem('id_persona');

    
    this.dataService.getPeriodo ()
    .subscribe( (respuesta:Periodos) => {
    this.periodor = respuesta;
    this.periodor.clave_comun = respuesta[0];
    const Clave = Constantes.ARND+this.periodor.clave_comun['clave_comun']+Constantes.BRND;   
        this.ever =  this.campo,  this.valor,this.id_ture;
        this.datos = JSON.stringify({ "id_persona": id_persona,"campo": this.campo, "valor": this.valor ,"id_ture": this.id_ture,"clave": Clave});
          this.reporteServicio.guardarTurecambios(this.datos).subscribe(
            datos => {
              Swal.fire({
                text: 'Registro actualizado',
                icon: 'success',
                showConfirmButton: false
              })
              // , this.recarga();
              , this.ngOnInit();
            });
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



  submittiket(){
      this.isSubmittedTike = true;
      const valor = JSON.stringify(this.careTiketForm.value);
      console.log(valor);
      this.reporteServicio.guardarTiketReport( valor ).subscribe( respuesta => {
        Swal.fire({
          title: 'Incidencia resuelta',
          text: 'la incidencia ha quedado como resuelta',
          icon: 'success',  
          showConfirmButton : true
        })
        , this.recarga();
        
      });   
  }

  submitturnos(){
    this.isSubmittedTurno = true;
    const valor = JSON.stringify(this.tureTiketForm.value);
    
    this.reporteServicio.guardarTurnoReport( valor ).subscribe( respuesta => {
      Swal.fire({
        title: 'Incidencia resuelta',
        text: 'la incidencia ha quedado como resuelta',
        icon: 'success',  
        showConfirmButton : true
      })
      , this.recarga();
      
    });   
  }



get care_ticket() { return this.careTiketForm.get('care_ticket'); }
get care_fecha() { return this.careTiketForm.get('care_fecha'); }
get care_titulo() { return this.careTiketForm.get('care_titulo'); }



}
