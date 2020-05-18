import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constantes } from '../models/constantes.model';
import { map } from 'rxjs/operators';
import { Tickets } from '../models/tickets';

@Injectable({
  providedIn: 'root'
})
export class IncidenciasService {

  //constantes
  private PHP_API_SERVER = Constantes.API_SERVER; //URL del servicio


  constructor(private httpClient: HttpClient) { }

  
  getListadoCriti(cb){
    const clave = localStorage.getItem('ccom');
    const req = new XMLHttpRequest();
    req.open('GET', `${this.PHP_API_SERVER}/ajax/read_criti.php?clave=${clave}`);
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }


  getListadoCami(cb){
    const clave = localStorage.getItem('ccom');
    const req = new XMLHttpRequest();
    req.open('GET', `${this.PHP_API_SERVER}/ajax/read_cami.php?clave=${clave}`);
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }

  getListado(cb){
    const clave = localStorage.getItem('ccom');
    const req = new XMLHttpRequest();
    req.open('GET', `${this.PHP_API_SERVER}/ajax/read_defcon.php?clave=${clave}`);
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }

  getListadoCriticas(cb){
    const clave = localStorage.getItem('ccom');
    const req = new XMLHttpRequest();
    req.open('GET', `${this.PHP_API_SERVER}/ajax/read_crise.php?clave=${clave}`);
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }

  
  
  getListadoSoDi(cb){
    const clave = localStorage.getItem('ccom');
    const req = new XMLHttpRequest();
    req.open('GET', `${this.PHP_API_SERVER}/ajax/read_sodi.php?clave=${clave}`);
    req.onload = () => {
      cb(JSON.parse(req.response));
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
    console.log(datos);
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_defcon.php`,datos);
  }

  modiRegistrocrise(datos){
    console.log(datos);
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_crise.php`,datos);
  }
  modiRegistroSoDi(datos){
    console.log(datos);
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_sodi.php`,datos);
  }
  modiRegistroCAMI(datos){
    console.log(datos);
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_cami.php`,datos);
  }
  modiRegistroCRITI(datos){
    console.log(datos);
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_criti.php`,datos);
  }

  guardarTicketing(valor){
console.log("valor: ",valor)
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_ticketing.php`,valor);
  }

  
}
