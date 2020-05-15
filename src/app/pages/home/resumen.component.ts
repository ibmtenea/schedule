import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HomeService } from '../../services/home.service';
import { Resumen } from '../../models/rb4resumen';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html'
  
})
export class ResumenComponent implements OnInit {


  rowsd = [];
  tempd = [];
  resolverSubmit = new FormGroup({
    clave_comun: new FormControl(''),
    recoba_incidencias_pendientes: new FormControl(''),
  });
  isSubmitted= false;

 public conIncidencia: Resumen;
 public destaIncidencia: Resumen;
 public resumenIncidencia: Resumen;
  
  constructor(private homeServicio: HomeService,private fb: FormBuilder) { }

  ngOnInit(){


this.getConIncidencias();
this.getDestaIncidencias(); 
this.getPendientesIncidencias(); 
    // this.homeServicio.getResumen ()
    //   .subscribe( (respuesta:Resumen) => {
    //      this.registro = respuesta;
    //      this.resolverSubmit = this.fb.group({
    //       // clave_comun: [this.registro.clave_comun,Validators.required],
    //       // recoba_incidencias_pendientes: [this.registro.recoba_incidencias_pendientes,Validators.required]
    //     });
    //   });
  }

  getConIncidencias(){   
    this.homeServicio.getResolucionBatch ()
     .subscribe( (respuesta:Resumen) => {
     this.conIncidencia = respuesta;
     this.conIncidencia.clave_comun = respuesta[0];  
     });
  }

  getDestaIncidencias( ){   
    this.homeServicio.getResolucionBatch2()
     .subscribe( (respuesta:Resumen) => {
     this.destaIncidencia = respuesta;
     this.destaIncidencia.clave_comun = respuesta[0];     
     });
  }
  
  getPendientesIncidencias(){  
    this.homeServicio.getResolucionResumen ()
     .subscribe( (respuesta:Resumen) => {
     this.resumenIncidencia = respuesta
     });
  }

  recarga(){ 
    location.reload();
  }

  onSubmit() { 
    this.isSubmitted = true;
    const valor = JSON.stringify(this.resolverSubmit.value);
    
    this.homeServicio.guardarResumen( valor ).subscribe( respuesta => {
      Swal.fire({
        title: 'Incidencia resuelta',
        text: 'la incidencia ha quedado como resuelta',
        icon: 'success',  
        showConfirmButton : true
      }), this.recarga();
      
    });   
}

get id_incidencias() { return this.resolverSubmit.get('id_incidencias'); }
get token_incidencia() { return this.resolverSubmit.get('token_incidencia'); }



}
