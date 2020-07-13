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
import { NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html'
  
})
export class ResumenComponent implements OnInit {
  public Editor = ClassicEditor;
  closeResult: string;
  modalOptions:NgbModalOptions;
  resumenes: ResumenBatch = new ResumenBatch();
  isSubmittedTurno = false;
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
    // @HostListener('document:click', ['$event'])
    // clickout(event) {
    //   this.ngOnInit();
    // }
  

    DefconFormEdicion1 = new FormGroup({
      esre_controles_batch:new FormControl(''),
      clave_comun:new FormControl('')
    });
    DefconFormEdicion2 = new FormGroup({
      esre_incidencias_resueltas:new FormControl(''),
      clave_comun:new FormControl('')
    });
    DefconFormEdicion3 = new FormGroup({
      esre_incidencias_pendientes:new FormControl(''),
      clave_comun:new FormControl('')
    });

  

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    height: '35rem',
    width: '760px',
    minHeight: '35rem',
    placeholder: 'Escriba el texto aquí...',

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
    private fb: FormBuilder,
    private modalService: NgbModal

  ) {

    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop',
      size: 'lg' 
    }



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
            this.DefconFormEdicion1 = this.fb.group({
              esre_controles_batch:[this.resumenes.esre_controles_batch],
              id_esre: [this.resumenes.id_esre],
            });
            this.DefconFormEdicion2 = this.fb.group({
              esre_incidencias_resueltas:[this.resumenes.esre_incidencias_resueltas],
              id_esre: [this.resumenes.id_esre],
            });
            this.DefconFormEdicion3 = this.fb.group({
              esre_incidencias_pendientes:[this.resumenes.esre_incidencias_pendientes],
              id_esre: [this.resumenes.id_esre],
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
  updateValue1(){
    this.isSubmittedTurno = true;
    const valordefcon = JSON.stringify(this.DefconFormEdicion1.value);
    this.homeService.updateResumenEstado1( valordefcon ).subscribe( respuesta => {
      Swal.fire({
        title: 'Registro Modificado',
        text: 'Se ha modificado el registro',
        icon: 'success',  
        showConfirmButton : false
      }), this.recarga();
    });   
  }
  updateValue2(){
    this.isSubmittedTurno = true;
    const valordefcon = JSON.stringify(this.DefconFormEdicion2.value);
    this.homeService.updateResumenEstado2( valordefcon ).subscribe( respuesta => {
      Swal.fire({
        title: 'Registro Modificado',
        text: 'Se ha modificado el registro',
        icon: 'success',  
        showConfirmButton : false
      }), this.recarga();
    });   
  }
  updateValue3(){
    this.isSubmittedTurno = true;
    const valordefcon = JSON.stringify(this.DefconFormEdicion3.value);
    this.homeService.updateResumenEstado3( valordefcon ).subscribe( respuesta => {
      Swal.fire({
        title: 'Registro Modificado',
        text: 'Se ha modificado el registro',
        icon: 'success',  
        showConfirmButton : false
      }), this.recarga();
    });   
  }





}
