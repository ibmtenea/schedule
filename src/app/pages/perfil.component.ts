import { Component, OnInit } from '@angular/core';
import { Constantes } from '../models/constantes.model';
import { HttpClient } from '@angular/common/http';
import { DataserviceService } from '../services/dataservice.service';
import { Router } from '@angular/router';
import { Personas } from '../models/personas';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
  
})
export class PerfilComponent implements OnInit {

  user:Personas = new Personas();
  PHP_API_SERVER = Constantes.API_SERVER; //URL del servicio
  editing = {};
  campo: any;
  id_persona: any;
  valor: any;

  ever: any;
  req: any;
  datos: string;


  constructor(
              private httpClient: HttpClient,
              private dataService: DataserviceService,
              private router:Router) 
              { }

  ngOnInit(){
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

  /**
   * reload pagina al usar sweet alerts etc
   */
  recarga() {
    location.reload();
  }

   /**
   * metodo que actualiza los campos
   */

   updateValue(id_persona,event, cell, valor) {
    this.editing['-' + cell] = false;
    this.campo = cell;
    this.valor = valor;
    const clave = localStorage.getItem('ccom');
    this.ever =  this.campo,  this.valor,this.id_persona;
    this.datos = JSON.stringify({ "id_persona": id_persona,"campo": this.campo, "valor": this.valor ,"clave": clave});

      this.dataService.guardarPersona(this.datos).subscribe(
        datos => {
          Swal.fire({
            text: 'Registro actualizado',
            icon: 'success',
            showConfirmButton: false
          })
           , this.recarga();
          //, this.ngOnInit();
        });
   
  }


}
