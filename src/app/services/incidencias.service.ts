import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constantes } from '../models/constantes.model';
import { map } from 'rxjs/operators';
import { Tickets } from '../models/tickets';
import { NgxSpinnerService } from "ngx-spinner";
@Injectable({
  providedIn: 'root'
})
export class IncidenciasService {

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


  guardarDefcon(valor){  
    console.log(valor);
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/crear_defcon.php`, valor);
  }


  getListadoCriti(cb){
    const clave = localStorage.getItem('ccom');
    const req = new XMLHttpRequest();
    this.showLoadingSpinner();
    req.open('GET', `${this.PHP_API_SERVER}/ajax/read_criti.php?clave=${clave}`);
    req.onload = () => {
      cb(JSON.parse(req.response));
      this.hideLoadingSpinner();
    };
    req.send();
  }


  getListadoCami(cb){
    const clave = localStorage.getItem('ccom');
    const req = new XMLHttpRequest();
    this.showLoadingSpinner();
    req.open('GET', `${this.PHP_API_SERVER}/ajax/read_cami.php?clave=${clave}`);
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
    req.open('GET', `${this.PHP_API_SERVER}/ajax/read_defcon.php?clave=${clave}`);
    req.onload = () => {
      cb(JSON.parse(req.response));


      this.hideLoadingSpinner();
    };
    req.send();
  }

  getListadoCriticas(cb){
    const clave = localStorage.getItem('ccom');
    const req = new XMLHttpRequest();
    this.showLoadingSpinner();
    req.open('GET', `${this.PHP_API_SERVER}/ajax/read_crise.php?clave=${clave}`);
    req.onload = () => {
      cb(JSON.parse(req.response));
      this.hideLoadingSpinner();
    };
    req.send();
  }

  
  
  getListadoSoDi(cb){
    const clave = localStorage.getItem('ccom');
    const req = new XMLHttpRequest();
    this.showLoadingSpinner();
    req.open('GET', `${this.PHP_API_SERVER}/ajax/read_sodi.php?clave=${clave}`);
    req.onload = () => {
      cb(JSON.parse(req.response));
      this.hideLoadingSpinner();
    };
    req.send();
  }
  
  getTicketing(){
    const clave = localStorage.getItem('ccom');
    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_tike.php?clave=${clave}`)
    .pipe(
      map( this.crearArreglo )
    );
  }
  private crearArreglo( ticketObjeto: Object ){
    const tickets: Tickets[] = [];
    if( ticketObjeto === null ) { return[]; }
    Object.keys ( ticketObjeto ).forEach( key => {
    const tike: Tickets = ticketObjeto[key];
    tike.id_tike = key;
    tickets.push ( tike );
    })
    return tickets;
  }


  guardarResumen(valor){
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_rbcuatroestados.php`,valor);
  }


  getMeses() {
    const clave = localStorage.getItem('ccom');
    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_mes_tike.php?clave=${clave}`);
  }

  // getTicketing() {
  //   const clave = localStorage.getItem('ccom');
  //   return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_tike.php?clave=${clave}`);
  // }

  modiRegistroDEF(datos){
  
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_defcon.php`,datos);
  }

  modiRegistrocrise(datos){
  
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_crise.php`,datos);
  }
  modiRegistroSoDi(datos){
   
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_sodi.php`,datos);
  }
  modiRegistroCAMI(datos){
   
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_cami.php`,datos);
  }
  modiRegistroCRITI(datos){
  
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_criti.php`,datos);
  }

  guardarTicketing(valor){

    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_ticketing.php`,valor);
  }

   //obtener persona por id
      getDetalleIncidencia( inci_token ){
        return this.httpClient.get(`${ this.PHP_API_SERVER}/ajax/incidencia_detalle.php?inci_token=${ inci_token }`);
    }
    
    guardarIncidencia(valor){  

      return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/incidencia_update.php`, valor);
    }

  
}
