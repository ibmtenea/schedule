import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constantes } from '../models/constantes.model';
import { map } from 'rxjs/operators';
import { Schedule } from '../models/schedule';
import { Diser } from '../models/diser';
import { Dimod } from '../models/dimod';
import { DimodComentarios } from '../models/dimodcomentarios';
import { NgxSpinnerService } from "ngx-spinner";
import { ImagenCheck } from '../models/imagencheck';
import { Personas } from '../models/personas';
@Injectable({
  providedIn: 'root'
})
export class PendientesService {

  //constantes
  private PHP_API_SERVER = Constantes.API_SERVER; //URL del servicio
  public showSpinner: boolean = false;
  user:Personas = new Personas();
  constructor(private spinner: NgxSpinnerService,private httpClient: HttpClient) { }

  

  showLoadingSpinner() {
    this.spinner.show();
  }
  
  hideLoadingSpinner() {
    this.spinner.hide();
  }

  deletePendi(datosborrado){
    
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/delete_pendi.php`,datosborrado);
  }

  guardarPendi(valor){  
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/crear_pendi.php`, valor);
  }
  nuevoDiser(valor){  
    console.log(valor);
       return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/crear_diser.php`, valor);
  }

  nuevoDimod(valor){  
  console.log(valor);
      return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/crear_dimod.php`, valor);
  }

  updateRegistroFile(datosFile){  
    console.log(datosFile);
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/crear_pendi_file.php`,datosFile);
  }


  altaRegistroFile(datosFile) {
    console.log(datosFile);
          return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/crear_pendi_file.php`, datosFile);
        } 

  getFilePendi(id_pendi){
    console.log(id_pendi);
            return this.httpClient.get(`${ this.PHP_API_SERVER}/ajax/read_file_pendi.php?id_pendi=${ id_pendi }`);
  }





  nuevoHemo(valor){  
    console.log(valor);
        return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/crear_hemo.php`, valor);
  }    

  nuevoCitrix(valor){  
    console.log(valor);
        return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/crear_citrix.php`, valor);
  }    
          



  guardarSema(valor){

    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_sema.php`,valor);
  }

  getSema() {
    const clave = localStorage.getItem('ccom');
    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_sema.php?clave=${clave}`);
  }




  guardarCitrix(valor){

    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_citrix.php`,valor);
  }

  getCitrix() {
    const clave = localStorage.getItem('ccom');
    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_citrix.php?clave=${clave}`);
  }

  getCitrixComent() {
    const clave = localStorage.getItem('ccom');
    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_citrix_comentarios.php?clave=${clave}`);
  }

  guardarCitrixComent(valor){
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_citrix_comentarios.php`,valor);
  }


  


  guardarHemo(valor){
 
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_hemo.php`,valor);
  }

  getHemo() {
    const clave = localStorage.getItem('ccom');
    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_hemo.php?clave=${clave}`);
  }

  getHemoComent() {
    const clave = localStorage.getItem('ccom');
    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_hemo_comentarios.php?clave=${clave}`);
  }

  guardarHemoComent(valor){
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_hemo_comentarios.php`,valor);
  }



  
  guardarDimod(valor){
    console.log(valor);
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_dimod.php`,valor);
  }

  getDimod() {
    const clave = localStorage.getItem('ccom');
    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_dimod.php?clave=${clave}`);
  }




  getDimodComent() {
    const clave = localStorage.getItem('ccom');
    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_dimod_comentarios.php?clave=${clave}`);
  }

  guardarDimodComent(valor){
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_dimod_comentarios.php`,valor);
  }


  
  guardarDiser(valor){
        return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_diser.php`,valor);
  }

  getDiser(){
    const clave = localStorage.getItem('ccom');
    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_diser.php?clave=${clave}`)
    .pipe(
      map( this.crearArreglosDiser )
    );
  }
  private crearArreglosDiser( scheObjeto: Object ){
    const temas: Diser[] = [];
    if( scheObjeto === null ) { return[]; }
    Object.keys ( scheObjeto ).forEach( key => {
    const tem: Diser = scheObjeto[key];
    tem.id_diser = key;
    temas.push ( tem );
    })
    return temas;
  }









  guardarSchedule(valor){
        return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_pendi.php`,valor);
  }

  getDiasTemas(){
    const clave = localStorage.getItem('ccom');
    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_pendi.php?clave=${clave}`)
    .pipe(
      map( this.crearArreglosche )
    );
  }
  private crearArreglosche( scheObjeto: Object ){
    const temas: Schedule[] = [];
    if( scheObjeto === null ) { return[]; }
    Object.keys ( scheObjeto ).forEach( key => {
    const tem: Schedule = scheObjeto[key];
    tem.id_pendi = key;
    temas.push ( tem );
    })
    return temas;
  }


  
  modiRegistroDEF(datos){
    console.log(datos);
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_defcon.php`,datos);
  }

  
  
}
