import { Component, OnInit, HostListener } from '@angular/core';
import { PendientesService } from '../../../../services/pendientes.service';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CambiosReporte } from '../../../../models/cambiosreporte';
import Swal from 'sweetalert2';
import { ReporteGlogalService } from 'src/app/services/reporteglobal.service';

import { IncidenciasReporte } from 'src/app/models/reporteincidencias';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-reportincidencias',
  templateUrl: './reportincidencias.component.html',
  styleUrls: ['./reportincidencias.component.css']
})
export class ReportincidenciasComponent implements OnInit {


  incidencias:IncidenciasReporte[] = [];
  closeResult: string;
  modalOptions:NgbModalOptions;
  id_incid: any;
  id_persona: any;
 
  incideTiketForm = new FormGroup({
    id_persona:new FormControl(''),
    incid_tipo: new FormControl(''),
    incid_texto: new FormControl(''),
    clave_comun: new FormControl('')
  });

  campo: any;
  valor: any;
  editing = {};
  ever: any;
  req: any;
  datos: string;
  isSubmittedTurno = false;
      // //click fuera del input
      @HostListener('document:click', ['$event'])
      clickout(event) {
        
      }

  constructor(private fb: FormBuilder,private reporteServicio:ReporteGlogalService,private modalService: NgbModal) { 

    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop',
      size: 'lg' 
    }

    this.incideTiketForm = this.fb.group({
      id_persona: ['', Validators.required],
      incid_texto: ['', Validators.required],
      incid_tipo:['', Validators.required],
      clave_comun: [localStorage.getItem('ccom'), Validators.required]
    });

  }

  ngOnInit(){

    this.getcambiosIncid();
  }


  getcambiosIncid(){   
    this.reporteServicio.getIncidcambios()
    .subscribe( respuesta => {
    this.incidencias=respuesta;
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

  updateValueIncid(id_incid,event, cell, valor, rowIndex:number) {
    this.editing[rowIndex + '-' + cell] = false;
    this.campo = cell;
    this.valor = valor;
    this.id_incid = id_incid;
    const id_persona = localStorage.getItem('id_persona');
    const clave = localStorage.getItem('ccom');
    this.ever =  this.campo,  this.valor,this.id_incid;
    this.datos = JSON.stringify({ "id_persona": id_persona,"campo": this.campo, "valor": this.valor ,"id_incid": this.id_incid,"clave": clave});
      this.reporteServicio.guardarIncidcambios(this.datos).subscribe(
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


  submitincide(){
    this.isSubmittedTurno = true;
    const valor = JSON.stringify(this.incideTiketForm.value);
    
    this.reporteServicio.guardarInciReport( valor ).subscribe( respuesta => {
      Swal.fire({
        title: 'Incidencia resuelta',
        text: 'la incidencia ha quedado como resuelta',
        icon: 'success',  
        showConfirmButton : true
      })
   //   , this.recarga();
      
    });   
  }


}
