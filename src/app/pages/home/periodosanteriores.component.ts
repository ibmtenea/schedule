import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DataserviceService } from 'src/app/services/dataservice.service';
import { HomeService } from 'src/app/services/home.service';
import Swal from 'sweetalert2';
import { ImagenCapex } from 'src/app/models/imagencapex';

@Component({
  selector: 'app-periodosanteriores',
  templateUrl: './periodosanteriores.component.html'
})
export class PeriodosanterioresComponent implements OnInit {


  imagenes: ImagenCapex = new ImagenCapex();
  private imageSrc: string = '';
  id_capex:string;

  imagenCapexForm = new FormGroup({
    capex_imagen: new FormControl(''),
    clave_comun: new FormControl('')
  });

  datosFotoCapex: string;



  constructor(
    private fb: FormBuilder,
    private dataService: DataserviceService,
    private homeServicio: HomeService
  ) {

    this.imagenCapexForm = this.fb.group({
      capex_imagen: ['', Validators.required],
      clave_comun: [localStorage.getItem('ccom')]
      });

   }

  ngOnInit(): void {
    this.getImagenCapexActual();
  }

   /**
   * reload pagina al usar sweet alerts etc
   */
  recarga() {
    location.reload();
  }

  getImagenCapexActual(){  
    this.homeServicio.getImgCapex()
    .subscribe((respuesta: ImagenCapex) => {
      this.imagenes = respuesta;

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
   
    const clave_comun = this.imagenCapexForm.value.clave_comun;
    this.datosFotoCapex = JSON.stringify({ "clave_comun": clave_comun , "capex_imagen": this.imageSrc});

    this.homeServicio.getImgCapex()
    .subscribe((respuesta: ImagenCapex) => {
      this.imagenes = respuesta;
      const imagenExiste = this.imagenes.capex_imagen;

        if(imagenExiste!=""){
            this.homeServicio.updateRegistroCapexFoto(this.datosFotoCapex).subscribe();
            Swal.fire({
              text: 'Foto actualizada',
              icon: 'success',
              showConfirmButton: false
            })
         //  , this.recarga()
            ;
        } else {
            this.homeServicio.altaRegistroCapexFoto(this.datosFotoCapex).subscribe();
            Swal.fire({
              text: 'Foto añadida',
              icon: 'success',
              showConfirmButton: false
            })
          , this.recarga()
            ;
        }

        });

  }

}
