import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constantes } from '../models/constantes.model';
import { NgxSpinnerService } from "ngx-spinner";
import { Ayuda } from '../models/ayuda';
import { map } from 'rxjs/operators';
let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

@Injectable({
  providedIn: 'root'
})
export class EventosService {

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


   
  getEventos(){
    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_eventos.php`);
  }


  getDetalle(id){
  return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/detalle_eventos.php?id_evento=${id}`);
}

  
  addEvent(valor){
    
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/crear_eventos.php`,valor);
  }

  
  modificarEvento(valor){console.log(valor);
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_eventos.php`,valor);
  }

  modiRegistroBacth(datos){
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_batch1.php`,datos);
  }


  

}
export function createEventId() {
  return String(eventGuid++);
}