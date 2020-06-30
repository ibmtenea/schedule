import { Component, OnInit, HostListener } from '@angular/core';
import { ReporteGlogalService } from '../../../../services/reporteglobal.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Schedule } from '../../../../models/schedule';
import Swal from 'sweetalert2';
import { ImagenCheck } from '../../../../models/imagencheck';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Constantes } from 'src/app/models/constantes.model';
import { Periodos } from 'src/app/models/periodos';
import { DataserviceService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'app-checktask',
  templateUrl: './checktask.component.html',
  styleUrls: ['./checktask.component.css']
})
export class ChecktaskComponent implements OnInit {


  temas:ImagenCheck[] = [];


  duracion: ImagenCheck[] = [];

  private imageSrc: string = '';

  campo: any;
  id_imch:string;
  private PHP_API_SERVER = Constantes.API_SERVER; //URL del servicio

  id_persona: any;
  valor: any;
  editing = {};
  ever: any;
  req: any;
  datos: string;
  datosFoto: string;
  madre: any;
      // //click fuera del input
      @HostListener('document:click', ['$event'])
      clickout(event) {
        
      }
selectedFile:File=null;

public periodok: Periodos;


accionForm = new FormGroup({
  imch_imagen: new FormControl(''),
  existe: new FormControl(''),
  clave_comun: new FormControl('')
});



  constructor(private dataService: DataserviceService,private fb: FormBuilder, private http: HttpClient,
      private activatedRoute: ActivatedRoute,private reporteServicio:ReporteGlogalService) { 
        this.dataService.getPeriodo ()
        .subscribe( (respuesta:Periodos) => {
        this.periodok = respuesta;
        this.periodok.clave_comun = respuesta[0];
        const Clave = Constantes.ARND+this.periodok.clave_comun['clave_comun']+Constantes.BRND;
            this.accionForm = this.fb.group({
              imch_imagen: ['', Validators.required],
              clave_comun: [Clave, Validators.required],
              existe: [''],
            });
         });

  }

  ngOnInit(){
    this.getTemasDias();
    this.getPeriodoActual();
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

  getPeriodoActual(){   
    this.dataService.getPeriodo ()
     .subscribe( (respuesta:Periodos) => {
     this.periodok = respuesta;

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

    this.datosFoto = JSON.stringify({ "clave_comun": clave_comun , "imch_imagen": this.imageSrc});
    this.reporteServicio.altaRegistroFoto(this.datosFoto).subscribe();
    
    Swal.fire({
      text: 'Foto actualizada',
      icon: 'success',
      showConfirmButton: false
    })
    , this.recarga()
    ;


  }









}
