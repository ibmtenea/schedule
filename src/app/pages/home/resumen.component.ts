import { Component, OnInit, ElementRef,HostListener } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HomeService } from '../../services/home.service';
import { Resumen } from '../../models/rb4resumen';
import { ResumenBatch } from '../../models/resumenbatch';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html'
  
})
export class ResumenComponent implements OnInit {

 
  resumenes: ResumenBatch = new ResumenBatch();
  
  editing = {};
  my_messages = {
    'emptyMessage': '',
    'totalMessage': ''
  };
  campo: any;
  id_log: any;
  valor: any;
  ever: any;
  datosResumenEstado: string;
  id_esre: any;

    //click fuera del input
    @HostListener('document:click', ['$event'])
    clickout(event) {
      this.ngOnInit();
    }
  

  // issueForm = new FormGroup({
  //   id_issue: new FormControl(''),
  //   id_proyecto: new FormControl(''),
  //   id_estado: new FormControl(''),
  //   id_tipo: new FormControl(''),
  //   id_prioridad: new FormControl(''),
  //   issue_repo_git: new FormControl(''),
  //   issue_asignada: new FormControl(''),
  //   issue_creada: new FormControl(''),
  //   issue_fecha_creacion: new FormControl(''),
  //   issue_fecha_modificacion: new FormControl(''),
  //   issue_fecha_finalizacion: new FormControl(''),
  //   issue_fecha_objetivo_inicio: new FormControl(''),
  //   issue_fecha_objetivo_final: new FormControl(''),
  //   issue_fecha_despliegue: new FormControl(''),
  //   issue_fecha_reabierta: new FormControl(''),
  //   issue_titulo: new FormControl(''),
  //   issue_horas_estimadas: new FormControl(''),
  //   issue_descripcion: new FormControl('')
  // });

  



  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    width: '760px',
    minHeight: '5rem',
    placeholder: 'Escriba el texto aquí...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    toolbarHiddenButtons: [
      ['insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'insertImage',
        'strikeThrough',
        'subscript',
        'superscript',
        'fontName',
        'fontSize',
        'textColor',
        'backgroundColor',
        'customClasses']
    ]
  };

  constructor(
    private spinner: NgxSpinnerService,
    private homeService: HomeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private el: ElementRef,
    private fb: FormBuilder

  ) {



  }

  ngOnInit(): void {

    this.getResumenes();

  }


  /**
   * reload pagina al usar sweet alerts etc
   */
  recarga() {
    location.reload();
  }


  getResumenes() {
      this.homeService.getResumenBactch()
        .subscribe((resp: ResumenBatch) => {
          this.resumenes = resp;
  
        });
  }





  submitEditIssue() {
    // this.isSubmittedTurno = true;
    // const valor = JSON.stringify(this.issueEditForm.value,);

    // this.ResumenBatch.updateIssue(valor).subscribe(respuesta => {
    //   Swal.fire({
    //     title: 'Registro actualizado',
    //     text: 'Se ha actualizado el registro',
    //     icon: 'success',
    //     showConfirmButton: true
    //   })
    //     , this.recarga();
    // });
  }

  
  //eliminar registro      
  eliminarissue(id_issue: string) {

    // Swal.fire({
    //   title: `¿Desea elimina esta Issue?`,
    //   text: 'Confirme si desea borrar el registro',
    //   icon: 'question',
    //   showConfirmButton: true,
    //   showCancelButton: true

    // }).then(respuesta => {

    //   if (respuesta.value) {
    //     this.datosborrado = JSON.stringify({ "id_issue": id_issue });
    //     this.issuesService.deleteIssue(this.datosborrado).subscribe();
    //     Swal.fire({

    //       text: 'Registro eliminado',
    //       icon: 'success',
    //       showConfirmButton: false
    //     })
    //       , this.recargaredirect();

    //   }
    // });
  }


 /**
   * metodo que actualiza los campos
   */

  updateValue(id_esre,event, cell, valor) {
    this.editing[cell] = false;
    this.campo = cell;
    this.valor = valor;
    this.id_esre = id_esre;
    this.ever =  this.campo,  this.valor,this.id_esre;
    this.datosResumenEstado = JSON.stringify({ "campo": this.campo, "valor": this.valor ,"id_esre": this.id_esre});
      this.homeService.updateResumenEstado(this.datosResumenEstado).subscribe(
        datos => {
         this.ngOnInit();
        });
   
  }



}
