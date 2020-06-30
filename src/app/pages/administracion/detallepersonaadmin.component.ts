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
  selector: 'app-detallepersonaadmin',
  templateUrl: './detallepersonaadmin.component.html'
})
export class DetallePersonaAdminComponent implements OnInit {

  closeResult = '';
  // model: NgbDateStruct;
  registro: Personas = new Personas();

  public Editor = ClassicEditor;
  dias: { name: string; value: string; checked: boolean; }[];
  id_persona: string;

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


  constructor(private httpClient: HttpClient, private bitacoraServicio: BitacoraService,
    private activatedRoute: ActivatedRoute, private router: Router
    ) {


    // //cargo las personas para los combos select
    // httpClient.get<any[]>(this.PHP_API_SERVER + '/ajax/personas_seguimiento_read.php?id_tarea=' + this.datoregistro.id_tarea).subscribe(result => {
    //   this.personas = result;
    // }, error => console.error(error));


  }

  ngOnInit() {
    const id_persona = this.activatedRoute.snapshot.paramMap.get('id_persona');
    //const id_persona = this.makeid(5)+Constantes.ARND+identificador+Constantes.BRND
    this.bitacoraServicio.getRegistroPersonaLst(id_persona)
      .subscribe((respuesta: Personas) => {
        this.registro = respuesta;
        this.registro.id_persona = id_persona;
      });

  }



  makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
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