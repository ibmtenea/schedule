import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constantes } from '../models/constantes.model';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  //constantes
  private PHP_API_SERVER = Constantes.API_SERVER; //URL del servicio


  constructor(private httpClient: HttpClient) { }

  guardarResumen(valor){
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_rbcuatroestados.php`,valor);
  }

  getResolucionBatch(){
    const clave = localStorage.getItem('ccom');
    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_resumen_rb4.php?clave=${clave}`);
  }
  getResolucionBatch2(){
    const clave = localStorage.getItem('ccom');
    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_resumen2_rb4.php?clave=${clave}`);
  }
  getResolucionResumen(){
    const clave = localStorage.getItem('ccom');
    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_resumen.php?clave=${clave}`);
  }
 

  getResumen() {
    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_resumen_rb4.php`);
  }



  getListado(cb){
    const clave = localStorage.getItem('ccom');
    const req = new XMLHttpRequest();
    req.open('GET', `${this.PHP_API_SERVER}/ajax/read_rbcuatroestados.php?clave=${clave}`);
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }

  getListadoBatch1(cb){
    const clave = localStorage.getItem('ccom');
    const req = new XMLHttpRequest();
    req.open('GET', `${this.PHP_API_SERVER}/ajax/read_batch1.php?clave=${clave}`);
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }


  getListadoBatch2(cb){
    const clave = localStorage.getItem('ccom');
    const req = new XMLHttpRequest();
    req.open('GET', `${this.PHP_API_SERVER}/ajax/read_batch2.php?clave=${clave}`);
    req.onload = () => {
      cb(JSON.parse(req.response));
    };
    req.send();
  }


  modiRegistroBacth(datos){
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_batch1.php`,datos);
  }

  modiRegistroBacth2(datos){
    console.log(datos);
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_batch2.php`,datos);
  }
  

}
