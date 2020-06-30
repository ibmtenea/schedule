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
import { Personas } from 'src/app/models/personas';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-abririncidencia',
  templateUrl: './abririncidencia.component.html'
})
export class AbririncidenciaComponent implements OnInit {

  personas: Personas[] = [];
  PHP_API_SERVER = Constantes.API_SERVER; //URL del servicio

  personasdatos: Personas = new Personas();
  incidenciadatos: IncidenciasApp = new IncidenciasApp();
  public Editor = ClassicEditor;
  public imagePath;
  imgURL: any;
  public message: string;
  private imageSrc: string = '';
  datosFoto: string;
  incidenciaForm = new FormGroup({
      id_persona: new FormControl(),
      inci_enunciado: new FormControl(),
      inci_texto: new FormControl(),
      imagenincidencia: new FormControl(),
      inci_token: new FormControl()
  });
  base64textString: string;
  
  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
        
    );
}
  constructor(private httpClient: HttpClient,private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder,private adminService: AdminService) {


    const id_persona = localStorage.getItem('id_persona');
    this.adminService.getPersonas(id_persona)
      .subscribe((respuesta: Personas) => {
        this.personasdatos = respuesta;

        this.incidenciaForm = formBuilder.group({
          id_persona: id_persona,
          nombres: this.personasdatos.nombres,
          imagenincidencia: [''],
          inci_token: [''],
          inci_enunciado: 
              ['',
                  [
                    Validators.minLength(10),
                    Validators.maxLength(140),
                    Validators.required
                  ]
              ],
          inci_texto: 
              ['',
                  [
                    Validators.minLength(10),
                    Validators.maxLength(2440),
                    Validators.required
                  ]
              ]
        });
      
      });






   }

  ngOnInit(){





  }

  recarga() {
    location.reload();
  }




  preview(e) {
    var files = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    if (files.length === 0)
      return;
 
      var pattern = /image-*/;
      if (!files.type.match(pattern)) {
        alert('invalid format');
        return;
      }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
      if (this.imgURL.length * 2  > 2**21) {  
          Swal.fire({
            title: 'ERROR en la imagen',
            text: 'La imagen es mayor de 2Mb',
            icon: 'success',
            showConfirmButton: false
          })
       }
    }
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
 

  
  guardaryenviarIncidencia() { 

      if (this.incidenciaForm.valid) {
        this.incidenciaForm.value.imagenincidencia = this.imgURL;
        this.incidenciaForm.value.inci_token = this.makeid(15);
        let peticion: Observable<any>;
        peticion = this.adminService.guardarNuevancidencia(this.incidenciaForm.value);
        peticion.subscribe(respuesta => {
          Swal.fire({
            title: this.incidenciadatos.inci_enunciado,
            text: `La incidencia ha sido abiertacon el token ${this.incidenciaForm.value.inci_token}`,
            icon: 'success',
            showConfirmButton: false
          })
           , this.recarga()
         ;
        });
    

      } 
    
   }


  //  preview(files) {
  //   if (files.length === 0)
  //     return;
 
  //   var mimeType = files[0].type;
  //   if (mimeType.match(/image\/*/) == null) {
  //     this.message = "Solamente imágenes!!";
  //     return;
  //   }
 
  //   var reader = new FileReader();
  //   this.imagePath = files;
  //   reader.readAsDataURL(files[0]); 
  //   reader.onload = (_event) => { 
  //     this.imgURL = reader.result; 
  //   }
  // }





}
