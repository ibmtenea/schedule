import { Component, OnInit } from '@angular/core';
import { Constantes } from '../models/constantes.model';
import { HttpClient } from '@angular/common/http';
import { DataserviceService } from '../services/dataservice.service';
import { Router } from '@angular/router';
import { Personas } from '../models/personas';
import { Periodos } from '../models/periodos';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
  
})
export class HeaderComponent implements OnInit {

  user:Personas = new Personas();
  PHP_API_SERVER = Constantes.API_SERVER; //URL del servicio
  public periodo: Periodos;
  constructor(
              private httpClient: HttpClient,
              private dataService: DataserviceService,
              private router:Router) 
              { }

  ngOnInit(){
    this.getPeriodoActual();
    this.getUsuario();
  }


 makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 



  getUsuario(){   
    const id_persona = localStorage.getItem('id_persona'); 
    this.dataService.getUserId ( id_persona )
      .subscribe( (resp:Personas) => {
        this.user = resp;
        this.user.id_persona = resp[0];
        const identidad = this.makeid(5)+Constantes.ARND+id_persona+Constantes.BRND
        this.user.id_persona=identidad;

      });
  }

  getPeriodoActual(){   
    this.dataService.getPeriodo ()
     .subscribe( (respuesta:Periodos) => {
     this.periodo = respuesta;
     this.periodo.pema_fecha = respuesta[0];  
     this.periodo.clave_comun = respuesta[0];
   //  console.log("Periodo: ",this.periodo.pema_fecha['pema_fecha']);
   //  console.log("C Comun: ",this.periodo.clave_comun['clave_comun']);
      const Clave = Constantes.ARND+this.periodo.clave_comun['clave_comun']+Constantes.BRND;
     localStorage.setItem('ccom', Clave);
    
     });
  }


  Logout() {
    localStorage.clear();
    localStorage.removeItem('token');
    localStorage.removeItem('id_rol');
    localStorage.removeItem('id_persona');
    localStorage.removeItem('valorTurno');
    const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/login';
                this.router.navigate([redirect]);
  }


}
