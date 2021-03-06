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
  altaRegistroFile(datosFile) {
    console.log(datosFile);
          return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/crear_cage.php`, datosFile);
        } 

  public uploadFichero(datos) {
    console.log(datos);
    let uploadURL = `${this.PHP_API_SERVER}/ajax/upload_fichero_cambios.php`;
    return this.httpClient.post<any>(uploadURL, datos);
  }

  
  getFileCage(){
    const clave_comun = localStorage.getItem('ccom');
      return this.httpClient.get(`${ this.PHP_API_SERVER}/ajax/read_cage.php?clave_comun=${ clave_comun }`);
  }
  updateRegistroFile(datosFile){  
    console.log(datosFile);
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_cage.php`,datosFile);
  }


  delete(datosborrado){
   
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/sodi_borrar_imagen.php`,datosborrado);
  }

  deleteDefcon(datosborradoDef){
    
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/delete_defcon.php`,datosborradoDef);
  }

  guardarDefcon(valordefcon){  

    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/crear_defcon.php`, valordefcon);
  }
  guardarCriti(valor){  

    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/crear_criti.php`, valor);
  }
  guardarCami(valor){  

    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/crear_cami.php`, valor);
  }
  
  guardarCrise(valor){  
 
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/crear_crise.php`, valor);
  }

  guardarSodi(valor){  
    console.log(valor);
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/crear_sodi.php`, valor);
  }

  guardarSodiImagen1(datosImagen1){  

    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_sodi_img1.php`, datosImagen1);
  }

  guardarSodiImagen2(datosImagen2){  
  
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_sodi_img2.php`, datosImagen2);
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

  getImgSodi(id_sodi) {
    const clave = localStorage.getItem('ccom');
    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_sodi_porid.php?clave_comun=${clave}&id_sodi=${id_sodi}`);
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
