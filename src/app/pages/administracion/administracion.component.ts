import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { DataserviceService } from '../../services/dataservice.service';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html'
  
})
export class AdministracionComponent implements OnInit {
  
  closeResult = '';

  datoregistromail = {
    id_lico: null,
    lico_nombre: null,
    lico_email: null
  }
  
  datoregistro  = {
      nombres: null,
      password: null,
      email: null,
      telefono: null,
      direccion:  null
    }

    public showSpinner: boolean = false;
  constructor(
    private spinner: NgxSpinnerService,
    private adminServicio:AdminService,
    private modalService: NgbModal,
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private dataService: DataserviceService
    ) { }

  ngOnInit() {

  }


  recarga() {
    location.reload();
  }
  showLoadingSpinner() {
    this.spinner.show();
  }
  
  hideLoadingSpinner() {
    this.spinner.hide();
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
      this.showLoadingSpinner();
              let peticion: Observable<any>;
              peticion = this.adminServicio.crearNuevoInforme();
              peticion.subscribe(respuesta => {
                this.hideLoadingSpinner();
              const fechahoy = Date();
                Swal.fire({
                  title: 'Informe creado',
                  text: `Se ha creado el informe nuevo con la fecha ${fechahoy}, un momento, por favor...`,
                  icon: 'success',  
                  timer: 4000,
                  showConfirmButton : false
                })
                //,location.reload()
                ;
                const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/home';
                this.router.navigate([redirect]);
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




  guardarUsuarioLista() {

    var patronemail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    var emailResult = patronemail.test(this.datoregistromail.lico_email);

    if (this.datoregistromail.lico_nombre == null || this.datoregistromail.lico_email == null ) {
        Swal.fire({
          text: 'Por favor, rellene los campos obligatorios',
          icon: 'error',
          showConfirmButton: true
        });
      }
      else if(emailResult == false){
          Swal.fire({
            text: 'Debe escribir un e-mail válido',
            icon: 'error',
            showConfirmButton: true
          });
        } else 

       {
        let peticion: Observable<any>;
        peticion = this.adminServicio.actualizarRegistroListaCorreo(this.datoregistromail);
        peticion.subscribe(respuesta => {
          Swal.fire({
            title: this.datoregistromail.lico_nombre,
            text: 'Usuario creado',
            icon: 'success',
            showConfirmButton: false
          })
          , this.recarga();
        });
      }
  }




}
