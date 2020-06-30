import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Constantes } from '../../models/constantes.model';
// import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
// import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Personas } from '../../models/personas';
import { Bitacora } from '../../models/bitacora';
import { BitacoraService } from '../../services/bitacora.service';


@Component({
  selector: 'app-detallepersonamailadmin',
  templateUrl: './detallepersonamailadmin.component.html'
})
export class DetallePersonaMailAdminComponent implements OnInit {

  closeResult = '';
  // model: NgbDateStruct;
  registro: Bitacora = new Bitacora();
  dregistroa: Bitacora = new Bitacora();
  public Editor = ClassicEditor;
  dias: { name: string; value: string; checked: boolean; }[];
  id_categoria: string;
  periodetalle: any[];
  categoperiod: any;
  periodcate: any;

  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

  PHP_API_SERVER = Constantes.API_SERVER; //URL del servicio

  datosborrado: string;
  numero: number;
  final: Observable<Object>;
  dregistro = null;
  datoregistro = {
    id_seguimiento: null,
    tokenid: this.activatedRoute.snapshot.paramMap.get('tokenid'),
    id_persona: null,
    id_persona_log: localStorage.getItem('id_persona')
  }
  constructor(private httpClient: HttpClient, private bitacoraServicio: BitacoraService,
    private activatedRoute: ActivatedRoute, private router: Router,
    // private modalService: NgbModal
    ) {


    // //cargo las personas para los combos select
    // httpClient.get<any[]>(this.PHP_API_SERVER + '/ajax/personas_seguimiento_read.php?id_tarea=' + this.datoregistro.id_tarea).subscribe(result => {
    //   this.personas = result;
    // }, error => console.error(error));


  }

  ngOnInit() {

    const tokenid = this.activatedRoute.snapshot.paramMap.get('tokenid');
    this.bitacoraServicio.getRegistro(tokenid)
      .subscribe((respuesta: Bitacora) => {
        this.registro = respuesta;
        this.registro.tokenid = tokenid;
      });

  }


  recarga() {
    location.reload();
  }


  // open(content) {
  //   this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }
  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }


  




}