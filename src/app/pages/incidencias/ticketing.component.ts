import { Tickets } from '../../models/tickets';
import { IncidenciasService } from '../../services/incidencias.service';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Component,OnInit } from '@angular/core';




@Component({
  selector: 'app-ticketing',
  templateUrl: './ticketing.component.html'
})
export class TicketingComponent implements  OnInit {


  ticketing:Tickets[] = [];

  campo: any;
  id_tike: any;
  id_persona: any;
  valor: any;
  
  name:string;
    // //click fuera del input
    // @HostListener('document:click', ['$event'])
    // clickout(event) {
    //   this.ngOnInit();
    // }



  constructor(private incidenciasServicio: IncidenciasService) { }

  ngOnInit() {
    this.getTicketing();
  }


  getTicketing(){   
    this.incidenciasServicio.getTicketing()
    .subscribe( respuesta => {
    this.ticketing=respuesta;
      });
  }


  /**
   * reload pagina al usar sweet alerts etc
   */
  recarga() {
    location.reload();
  }




 
  sampleClick(){
    console.log('clicked!!');
  }
  


}
