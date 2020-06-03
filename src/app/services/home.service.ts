import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constantes } from '../models/constantes.model';
import { NgxSpinnerService } from "ngx-spinner";
import { Periodos } from '../models/periodos';
import { DataserviceService } from './dataservice.service';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  unsubscribe() {
  }

  public periodo: Periodos;
  //constantes
  private PHP_API_SERVER = Constantes.API_SERVER; //URL del servicio
  public showSpinner: boolean = false;
   userTabLocation0 = localStorage.getItem('userTabLocationRB4');
  constructor(private spinner: NgxSpinnerService,private httpClient: HttpClient,private dataService: DataserviceService) { }

  showLoadingSpinner() {
    this.spinner.show();
  }
  
  hideLoadingSpinner() {
    this.spinner.hide();
  }


  guardarResumen(valor){
    console.log(valor);
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

  getPeriodo(){
    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_periodo.php`);
  }




  setClavePDF(datosenvio){




    //extraemos la classe que enviamos para determinar qué url usamos
    // const datosen = JSON.parse(datosenvio);

    // if(datosen.classe == "ClaseRBcuatroEstados"){
      return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/rb4_pdf_crear.php`);
    // } else {
    //    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/rb4_pdf_crear.php`);
    // }
    
    
  }



  getResumen() {
    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_resumen_rb4.php`);
  }

  getListado(cb){

    this.dataService.getPeriodo ()
    .subscribe( (respuesta:Periodos) => {
    this.periodo = respuesta;
    this.periodo.pema_fecha = respuesta[0];  
    this.periodo.clave_comun = respuesta[0];
    localStorage.setItem('ccom', Constantes.ARND+this.periodo.clave_comun['clave_comun']+Constantes.BRND);
    
        const clave = Constantes.ARND+this.periodo.clave_comun['clave_comun']+Constantes.BRND;
        const req = new XMLHttpRequest();
        this.showLoadingSpinner();
        req.open('GET', `${this.PHP_API_SERVER}/ajax/read_rbcuatroestados.php?clave=${clave}`);
        req.onload = () => {
          cb(JSON.parse(req.response));
          this.hideLoadingSpinner();
        };
        req.send();

  });
  }






  getListadoBatch1(cb){

    const clave = localStorage.getItem('ccom');
    const req = new XMLHttpRequest();
    //this.showLoadingSpinner();
    req.open('GET', `${this.PHP_API_SERVER}/ajax/read_batch1.php?clave=${clave}`); 
    req.onload = () => {
      cb(JSON.parse(req.response));
      this.hideLoadingSpinner();
    };
    req.send();

  }




  getListadoBatch2(cb){
    const userTabLocation0 = localStorage.getItem('userTabLocationRB4'); 
    const clave = localStorage.getItem('ccom');
    const req = new XMLHttpRequest();
   // this.showLoadingSpinner(); 
    req.open('GET', `${this.PHP_API_SERVER}/ajax/read_batch2.php?clave=${clave}`); 
    req.onload = () => {
      cb(JSON.parse(req.response));
      this.hideLoadingSpinner();
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
