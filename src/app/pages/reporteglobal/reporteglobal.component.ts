import { Component, OnInit, Inject } from '@angular/core';
import { ReporteGlogalService } from 'src/app/services/reporteglobal.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-reporteglobal',
  templateUrl: './reporteglobal.component.html'
})
export class ReporteglobalComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document,private http: HttpClient,
    private activatedRoute: ActivatedRoute,private reporteServicio:ReporteGlogalService) { }

  ngOnInit(): void {
  }


  getUrlPrint(){
    const clave_comun = localStorage.getItem('ccom');
  
    
        Swal.fire({
          title: `¿Desea enviar el informe a la lista de correo?`,
          text: 'Confirme si desea enviar el informe',
          icon: 'question',
          showConfirmButton: true,
          showCancelButton: true

        }).then(
          
          respuesta => {
            if (respuesta.value) {

              window.open(`http://schedule.ibmes.site:80/s/ajax/send_reporte_global.php?x474rtrfdg4584gt88t44g4=${clave_comun}`, "_blank");

            }
          }

           
        );
        


    
  
  
  }

  

}
