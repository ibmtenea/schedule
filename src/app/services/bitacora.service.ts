import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constantes } from '../models/constantes.model';
import { NgxSpinnerService } from "ngx-spinner";


@Injectable({
  providedIn: 'root'
})
export class BitacoraService {

  //constantes
  private PHP_API_SERVER = Constantes.API_SERVER; //URL del servicio
  public showSpinner: boolean = false;

  constructor(private spinner: NgxSpinnerService,private httpClient: HttpClient) { }


  showLoadingSpinner() {
    this.spinner.show();
  }
  
  hideLoadingSpinner() {
    this.spinner.hide();
  }

  delete(datosborrado){
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/persona_borrado.php`,datosborrado);
  }


  getRegistro( tokenid:string ){
      return this.httpClient.get(`${ this.PHP_API_SERVER}/ajax/detalle_bitacora.php?tokenid=${ tokenid }`);
   }

   
   getListadoPersonas(cb){
    const req = new XMLHttpRequest();
    this.showLoadingSpinner();
    req.open('GET', `${this.PHP_API_SERVER}/ajax/read_personas.php`);
    req.onload = () => {
      cb(JSON.parse(req.response));
      this.hideLoadingSpinner();
    };
    req.send();
  }


  getListado(cb){
    const clave = localStorage.getItem('ccom');
    const req = new XMLHttpRequest();
    this.showLoadingSpinner();
    req.open('GET', `${this.PHP_API_SERVER}/ajax/read_bitacora.php?clave=${clave}`);
    req.onload = () => {
      cb(JSON.parse(req.response));
      this.hideLoadingSpinner();
    };
    req.send();
  }

 
  modiRegistroBacth(datos){
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_batch1.php`,datos);
  }


  

}
