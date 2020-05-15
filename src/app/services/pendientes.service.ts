import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constantes } from '../models/constantes.model';
import { map } from 'rxjs/operators';
import { Schedule } from '../models/schedule';
@Injectable({
  providedIn: 'root'
})
export class PendientesService {

  //constantes
  private PHP_API_SERVER = Constantes.API_SERVER; //URL del servicio


  constructor(private httpClient: HttpClient) { }

  



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
