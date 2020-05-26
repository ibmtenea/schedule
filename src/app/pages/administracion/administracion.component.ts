import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { Personas } from 'src/app/models/personas';
import { Validators, NgForm } from '@angular/forms';


@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html'
  
})
export class AdministracionComponent implements OnInit {
  
  closeResult = '';


  
  datoregistro  = {
      nombres: null,
      password: null,
      email: null,
      telefono: null,
      direccion:  null
    }

  constructor(
    private adminServicio:AdminService,
    private modalService: NgbModal,
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute, 
    private router: Router
    ) { }

  ngOnInit() {

  }


  recarga() {
    location.reload();
  }

  open(content) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }
  private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
  }



/**
 * CREAR NUEVO INFORME GLOBAL
 * 
 * 
 * 
 * 
 */
  nuevoInforme(){
    Swal.fire({
      title: 'CREANDO NUEVO INFORME',
      text: 'Confirme si desea crear el informe. Tenga en cuenta que esta acción no se puede deshacer.',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(respuesta => {




      let peticion: Observable<any>;
      peticion = this.adminServicio.crearNuevoInforme();
      peticion.subscribe(respuesta => {

      });







    });
  }




  guardarUsuario() {

    var patronemail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    var emailResult = patronemail.test(this.datoregistro.email);
    var patronpass = /.{6,}/;
    var passResult = patronpass.test(this.datoregistro.password);   
    


    if (this.datoregistro.nombres == null || this.datoregistro.email == null || this.datoregistro.password == null) {
        Swal.fire({
          text: 'Por favor, rellene los campos obligatorios',
          icon: 'error',
          showConfirmButton: true
        });
      }
      else  if(passResult == false){
          Swal.fire({
            text: 'El password debe de tener al menos 6 carácteres',
            icon: 'error',
            showConfirmButton: true
          });
        } else 
    
        if(emailResult == false){
          Swal.fire({
            text: 'Debe escribir un e-mail válido',
            icon: 'error',
            showConfirmButton: true
          });
        } else 

       {
        let peticion: Observable<any>;
        peticion = this.adminServicio.actualizarRegistro(this.datoregistro);
        peticion.subscribe(respuesta => {
          Swal.fire({
            title: this.datoregistro.nombres,
            text: 'Usuario creado',
            icon: 'success',
            showConfirmButton: false
          })
          , this.recarga();
        });
      }
  }










}
