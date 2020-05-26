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
import { CambiosReporte } from '../models/cambiosreporte';
import { TurnosReporte } from '../models/turnosreporte';
import { IncidenciasReporte } from '../models/reporteincidencias';
@Injectable({
  providedIn: 'root'
})
export class ReporteGlogalService {

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

  guardarTiketReport(valor){  

    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/crear_care_reporte.php`, valor);
  }
  guardarTurnoReport(valor){  
    console.log(valor);
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/crear_ture_reporte.php`, valor);
  }

  guardarInciReport(valor){  
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/crear_inci_reporte.php`, valor);
  }

  

  altaRegistroFoto(datosFoto) {
  
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_imch.php`, datosFoto);
  } 


guardarImgCheck(valor){
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_imch.php`,valor);
}


getImgCheck(){
  const clave = localStorage.getItem('ccom');
    return this.httpClient.get(`${ this.PHP_API_SERVER}/ajax/read_imch.php?clave=${ clave }`);
}



guardarIncidcambios(valor){
  return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_incid.php`,valor);
}
getIncidcambios(){
  const clave = localStorage.getItem('ccom');
  return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_incid.php?clave=${clave}`)
  .pipe(
    map( this.crearArreglosIncid )
  );
}
private crearArreglosIncid( scheObjeto: Object ){
  const temas: IncidenciasReporte[] = [];
  if( scheObjeto === null ) { return[]; }
  Object.keys ( scheObjeto ).forEach( key => {
  const tem: IncidenciasReporte = scheObjeto[key];
  tem.id_incid = key;
  temas.push ( tem );
  })
  return temas;
}





guardarTurecambios(valor){
  return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_ture.php`,valor);
}
getTurecambios(){
  const clave = localStorage.getItem('ccom');
  return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_ture.php?clave=${clave}`)
  .pipe(
    map( this.crearArreglosTure )
  );
}
private crearArreglosTure( scheObjeto: Object ){
  const temas: TurnosReporte[] = [];
  if( scheObjeto === null ) { return[]; }
  Object.keys ( scheObjeto ).forEach( key => {
  const tem: TurnosReporte = scheObjeto[key];
  tem.id_ture = key;
  temas.push ( tem );
  })
  return temas;
}



guardarCheckcambios(valor){
  return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_care.php`,valor);
}
getCheckcambios(){
  const clave = localStorage.getItem('ccom');
  return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_care.php?clave=${clave}`)
  .pipe(
    map( this.crearArregloscambios )
  );
}
private crearArregloscambios( scheObjeto: Object ){
  const temas: CambiosReporte[] = [];
  if( scheObjeto === null ) { return[]; }
  Object.keys ( scheObjeto ).forEach( key => {
  const tem: CambiosReporte = scheObjeto[key];
  tem.id_care = key;
  temas.push ( tem );
  })
  return temas;
}




// guardarImgCheck(valor){
//     return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_pendi.php`,valor);
// }

getDiasImgCheck(){
const clave = localStorage.getItem('ccom');
return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_imch.php?clave=${clave}`)
.pipe(
  map( this.crearArreglosImgCheck )
);
}
private crearArreglosImgCheck( scheObjeto: Object ){
const temas: ImagenCheck[] = [];
if( scheObjeto === null ) { return[]; }
Object.keys ( scheObjeto ).forEach( key => {
const tem: ImagenCheck = scheObjeto[key];
tem.id_imch = key;
temas.push ( tem );
})
return temas;
}




}
