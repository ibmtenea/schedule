import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { IncidenciasService } from '../../services/incidencias.service';
import { NgbModalOptions, NgbDateStruct, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FicherosCambios } from 'src/app/models/ficheroscambios';



@Component({
  selector: 'app-cambiosgenerica',
  templateUrl: './cambiosgenerica.component.html'
})
export class CambiosGenericaComponent implements OnInit {

  closeResult: string;
  modalOptions:NgbModalOptions;
  final: Observable<Object>;

  ficherosfile: FicherosCambios = new FicherosCambios();

  ficheros: FicherosCambios = new FicherosCambios();
  uploadResponse;
  formFileUp = new FormGroup({

    cage_file:new FormControl(''),
    clave_comun:new FormControl(''),
    cage_name:new FormControl(''),
  });
    datosFile: string;
    imageSrc: any;
    id_cage: any;
  constructor(private fb: FormBuilder,
    private modalService: NgbModal,
    private incidenciasServicio: IncidenciasService
    ) { 



        this.formFileUp = this.fb.group({
            cage_file : ['',Validators.required],
            cage_name : ['',Validators.required],
            clave_comun: [localStorage.getItem('ccom'), Validators.required],
          });

  }


  ngOnInit(){ this.getFicheroActual();}

  /**
   * reload pagina al usar sweet alerts etc
   */
  recarga() {
    location.reload();
  }


  getFicheroActual(){   
    this.incidenciasServicio.getFileCage()
    .subscribe( (respuesta:any) => {
    this.ficherosfile=respuesta;
  

      });
  }


  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /pdf-*/;
    var reader = new FileReader();
     if (!file.type.match(pattern)) {


       Swal.fire({
        text: 'Solo puede cargar PDF!!',
        icon: 'error',
        showConfirmButton: true
      });



       return;
     }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;
    const cage_name = this.formFileUp.value.cage_name;
    const clave_comun = this.formFileUp.value.clave_comun;
    this.datosFile = JSON.stringify({ "clave_comun": clave_comun , "cage_file": this.imageSrc, "cage_name": cage_name});

    this.incidenciasServicio.getFileCage()
    .subscribe((respuesta: FicherosCambios) => {
      this.ficheros = respuesta;
      const imagenExiste = this.ficheros.cage_file;

        if(imagenExiste!=""){
            this.incidenciasServicio.updateRegistroFile(this.datosFile).subscribe();
            Swal.fire({
              text: 'Archivo actualizado',
              icon: 'success',
              showConfirmButton: false
            })
           , this.recarga()
            ;
        } else {
            this.incidenciasServicio.altaRegistroFile(this.datosFile).subscribe();
            Swal.fire({
              text: 'Archivo añadido',
              icon: 'success',
              showConfirmButton: false
            })
           , this.recarga()
            ;
        }

        });

  }








}
