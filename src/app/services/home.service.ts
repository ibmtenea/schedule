import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constantes } from '../models/constantes.model';
import { NgxSpinnerService } from "ngx-spinner";
import { Periodos } from '../models/periodos';
import { DataserviceService } from './dataservice.service';
import { HorariosCoba } from '../models/horarioscoba';
import { HitosCoba } from '../models/hitoscoba';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  unsubscribe() {
  }

  private hitos: HitosCoba[] = [

    
{coba_id: 1,  coba_hito1: "Cambio de sesión / JAQ0003D"},
{coba_id: 2,  coba_hito1: "Contabilidad / JKG0030D"},
{coba_id: 3,  coba_hito1: "SCGI / JKM0090D"},
{coba_id: 4,  coba_hito1: "Incidencias críticas / JOM0527D"},
{coba_id: 5,  coba_hito1: "Saldos diarios / XDW0531D"},
{coba_id: 6,  coba_hito1: "Inventario / JKG0740D"},
{coba_id: 7,  coba_hito1: "Morosidad / JMO0091D"},
{coba_id: 8,  coba_hito1: "Saldos portal / FIWF0412"},
{coba_id: 9,  coba_hito1: "Saldos portal / FIWF0422"},
{coba_id: 10, coba_hito1: "D_Base_Liquidez XKV0297D"},
{coba_id: 11, coba_hito1: "D_Pasivo_Liquidez XKV0230D"},
{coba_id: 12, coba_hito1: "D_RentaFija_Liquidez XKV0371D"},
{coba_id: 13, coba_hito1: "D_Cuadros_Amortiz_Pi XKV0368D"},
{coba_id: 14, coba_hito1: "D_Cuadros_Amortiz_Pr XKV0367D"},
{coba_id: 15, coba_hito1: "D_Cuadros_Amortiz_Si XKV0369D"},
{coba_id: 16, coba_hito1: "Aprov_Base_Liquidez_D XAF1028D"},
{coba_id: 17, coba_hito1: "Aprov_Pasivo_D XAF1071D"},
{coba_id: 18, coba_hito1: "Aprov_Rentafija_Liquidez_D XAF1060D"},
{coba_id: 19, coba_hito1: "Aprov_Contrapartidasrf_D XAF1141D"},
{coba_id: 20, coba_hito1: "Aprov_Pagares_D XAF1145D"},
{coba_id: 21, coba_hito1: "Aprov_Goldencopy_D XAF1099D"},
{coba_id: 22, coba_hito1: "Aprov_Pe11_D XAF1097D"},
{coba_id: 23, coba_hito1: "Aprov_Balance_D XAF1115D"},
{coba_id: 24, coba_hito1: "Datamart_Derivados_D XAF1203D"},
{coba_id: 25, coba_hito1: "Datamart_Disponibles_D XAF1032D"},
{coba_id: 26, coba_hito1: "Datamart_Restopasivo_D XAF1204D"}

 
  ];

  
  getHitosCoba(): HitosCoba[]{
    return this.hitos;
  }


  getHorariosCoba(coba_id){
    console.log(coba_id);
        return this.httpClient.get(`${ this.PHP_API_SERVER}/ajax/read_horarios_coba.php?coba_id=${ coba_id }`);
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

  altaRegistroFoto(datosFoto) {

      return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/crear_imba.php`, datosFoto,{ responseType: 'text' });
    } 

  altaRegistroCapexFoto(datosFotoCapex) {
 
            return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/crear_capex.php`, datosFotoCapex,{ responseType: 'text' });
  } 

  getImgCheck(){
      const clave = localStorage.getItem('ccom');console.log(clave);
        return this.httpClient.get(`${ this.PHP_API_SERVER}/ajax/read_imba.php?clave=${ clave }`);
  }
  
  getImgCapex(){
    const clave = localStorage.getItem('ccom');
      return this.httpClient.get(`${ this.PHP_API_SERVER}/ajax/read_capex.php?clave_comun=${ clave }`);
  }

  getResumenBactch(){
    const clave = localStorage.getItem('ccom');

    return this.httpClient.get(`${this.PHP_API_SERVER}/ajax/read_estado_resumen.php?clave_comun=${clave}`);
  }

  getImgBactch(){
    const clave_comun = localStorage.getItem('ccom');
      return this.httpClient.get(`${ this.PHP_API_SERVER}/ajax/read_imba.php?clave_comun=${ clave_comun }`);
  }
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

  deleteBatch(datosborrado){
    console.log(datosborrado);
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/delete_coba1.php`,datosborrado);
  }

  guardarBatch(valor){  
   console.log(valor);
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/crear_batch1.php`, valor);
  }

  updateRegistroFoto(datosFoto){  
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_imba.php`,datosFoto);
  }

  updateRegistroCapexFoto(datosFotoCapex){  
   console.log(datosFotoCapex);
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_capex.php`,datosFotoCapex,{ responseType: 'text' });
  }

  updateResumenEstado1(valordefcon){  
    console.log(valordefcon);
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_estado_resumen1.php`,valordefcon);
  }
  updateResumenEstado2(valordefcon){  
    console.log(valordefcon);
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_estado_resumen2.php`,valordefcon);
  }
  updateResumenEstado3(valordefcon){  
    console.log(valordefcon);
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_estado_resumen3.php`,valordefcon);
  }
  
  modiRegistroBacth(datos){
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_batch1.php`,datos);
  }

  modiRegistroBacth2(datos){
 
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/update_batch2.php`,datos);
  }
  

}
