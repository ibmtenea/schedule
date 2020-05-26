import { Component, OnInit, HostListener } from '@angular/core';
import { ReporteGlogalService } from '../../../../services/reporteglobal.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Schedule } from '../../../../models/schedule';
import Swal from 'sweetalert2';
import { ImagenCheck } from '../../../../models/imagencheck';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checktask',
  templateUrl: './checktask.component.html',
  styleUrls: ['./checktask.component.css']
})
export class ChecktaskComponent implements OnInit {


  temas:ImagenCheck[] = [];
  accionForm: FormGroup;



  private imageSrc: string = '';

  campo: any;
  id_imch:string;


  id_persona: any;
  valor: any;
  editing = {};
  ever: any;
  req: any;
  datos: string;
  datosFoto: string;
      // //click fuera del input
      @HostListener('document:click', ['$event'])
      clickout(event) {
        
      }

  constructor(private fb: FormBuilder, 
      private activatedRoute: ActivatedRoute,private reporteServicio:ReporteGlogalService) { 
        const commm = localStorage.getItem('ccom');
 
        this.accionForm = this.fb.group({
          imch_imagen: ['', Validators.required],
          clave_comun: [commm, Validators.required],
          existe: [''],
        });

  }

  ngOnInit(){
    this.getTemasDias();
    
  }

  getTemasDias(){   
    this.reporteServicio.getImgCheck()
    .subscribe( (respuesta:any) => {
    this.temas=respuesta;
    this.id_imch=respuesta[0];



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

   updateValue(id_imch,event, cell, valor, rowIndex:number) {
    this.editing[rowIndex + '-' + cell] = false;
    this.campo = cell;
    this.valor = valor;
    this.id_imch = id_imch;
    const id_persona = localStorage.getItem('id_persona');
    const clave = localStorage.getItem('ccom');
    this.ever =  this.campo,  this.valor,this.id_imch;
    this.datos = JSON.stringify({ "id_persona": id_persona,"campo": this.campo, "valor": this.valor ,"id_imch": this.id_imch,"clave": clave});



      this.reporteServicio.guardarImgCheck(this.datos).subscribe(
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






  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;
   
    const clave_comun = this.accionForm.value.clave_comun;

    if(this.imageSrc==''){
      this.datosFoto = JSON.stringify({ "existe": "N" ,"clave_comun": clave_comun , "imch_imagen": this.imageSrc});
    } else {
      this.datosFoto = JSON.stringify({ "existe": "S" ,"clave_comun": clave_comun , "imch_imagen": this.imageSrc});
    }
       
    this.reporteServicio.altaRegistroFoto(this.datosFoto).subscribe();
    
    Swal.fire({
      text: 'Foto actualizada',
      icon: 'success',
      showConfirmButton: false
    })
   // , this.recarga()
    ;


  }










}
