import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constantes } from '../models/constantes.model';


@Injectable({
  providedIn: 'root'
})
export class IncidenciasAppService {
 
  private PHP_API_SERVER = Constantes.API_SERVER; //URL del servicio

  constructor(private httpClient: HttpClient) {}


    //obtener persona por id
    getDetalleIncidencia( token_incidencia ){
        return this.httpClient.get(`${ this.PHP_API_SERVER}/ajax/incidencia_detalle.php?token_incidencia=${ token_incidencia }`);
    }


    guardarIncidencia(valor){  
        console.log(valor);
        return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/incidencia_update.php`, valor);
      }

      

  delete(datosborrado){
    console.log(datosborrado);
    return this.httpClient.post(`${this.PHP_API_SERVER}/ajax/registro_historico_borrado.php`,datosborrado);
  }

}