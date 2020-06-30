import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Constantes } from '../../models/constantes.model';
import { Observable } from 'rxjs';
import { IncidenciasService } from '../../services/incidencias.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { IncidenciasApp } from '../../models/incidencias';


@Component({
  selector: 'app-detalleincidencia',
  templateUrl: './detalleincidencia.component.html'
})
export class DetalleincidenciaComponent implements OnInit {

  closeResult = '';
  model: NgbDateStruct;
  registro:IncidenciasApp = new IncidenciasApp();
  isSubmitted = false;
  public Editor = ClassicEditor;
 
  
  public onReady( editor ) {
      editor.ui.getEditableElement().parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
          
      );
  }

  resolverSubmit = new FormGroup({
    id_inci: new FormControl(''),
    inci_token: new FormControl(''),
    inci_comentarios: new FormControl(''),
  });

  public imagePath;
  imgURL: any;
  public message: string;

    PHP_API_SERVER = Constantes.API_SERVER; //URL del servicio

    datosborrado: string;
    numero: number;
    final: Observable<Object>;
    dregistro = null;
    datoregistro = {

      id_inci: this.activatedRoute.snapshot.paramMap.get('id_inci'),
  
    }
  constructor(private httpClient: HttpClient,private incidenciasService: IncidenciasService,
              private activatedRoute: ActivatedRoute,private router: Router,private fb: FormBuilder
              ){



              }

  ngOnInit(){
    const inci_token = this.activatedRoute.snapshot.paramMap.get('inci_token');
    console.log(inci_token);
    this.incidenciasService.getDetalleIncidencia ( inci_token )
      .subscribe( (respuesta:IncidenciasApp) => {
         this.registro = respuesta;
         this.registro.inci_token =   inci_token;
  
         this.resolverSubmit = this.fb.group({
          id_inci: [this.registro.id_inci,Validators.required],
          inci_token: [this.registro.inci_token,Validators.required],
          inci_comentarios: [this.registro.inci_comentarios,Validators.required],
        });
        
      });

  }




  recarga(){ 
    location.reload();
  }


  onSubmit() { 
    this.isSubmitted = true;
    const valor = JSON.stringify(this.resolverSubmit.value);
    
    this.incidenciasService.guardarIncidencia( valor ).subscribe( respuesta => {
      Swal.fire({
        title: 'Incidencia resuelta',
        text: 'la incidencia ha quedado como resuelta',
        icon: 'success',  
        showConfirmButton : true
      })
      , this.recarga();
      
    });   
}

get id_inci() { return this.resolverSubmit.get('id_inci'); }
get inci_token() { return this.resolverSubmit.get('inci_token'); }
get inci_comentarios() { return this.resolverSubmit.get('inci_comentarios'); }






 
  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Solamente imágenes!!";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }




}