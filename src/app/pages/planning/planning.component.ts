import { Component, ViewChild, Input } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import esLocale from '@fullcalendar/core/locales/es';
import { EventosService } from 'src/app/services/eventos.service';
import { Constantes } from 'src/app/models/constantes.model';
import Swal from 'sweetalert2';
import { NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ActivatedRoute } from '@angular/router';
import { DataserviceService } from 'src/app/services/dataservice.service';
import { Personas } from 'src/app/models/personas';
import { Eventos } from 'src/app/models/eventos';
@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html'
})


export class PlanningComponent {
  @ViewChild('modal') public modal : any;
  event: any;
  eventos:[];
  valor: string;
  ahora: string;
  closeResult: string;
  modalOptions:NgbModalOptions;
  public Editor = ClassicEditor;
  horactual: string;
 detalle:Eventos = new Eventos();
 isSubmitted = false;

  ModalForm = new FormGroup({
    id_persona:new FormControl(''),
    eventos_descripcion:new FormControl(''),
    hora_inicio:new FormControl(''),
    hora_fin:new FormControl('')
  });

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    height: '25rem',
    width: '750px',
    minHeight: '25rem',
    placeholder: 'Escriba el texto aquí...',

    toolbarHiddenButtons: [
      ['insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'insertImage',
        'strikeThrough',
        'subscript',
        'superscript',
        'fontName',
        'fontSize',
        'textColor',
        'backgroundColor',
        'customClasses']
    ]
  };
  user:Personas = new Personas();
          constructor(
            private eventosService: EventosService,
            private fb: FormBuilder,
            private modalService: NgbModal,
            private activatedRoute: ActivatedRoute,
            private dataService: DataserviceService
    
          ){


this.getUsuario();
            setInterval(() => {
              this.ahora = new Date().toString().split(' ')[4];
            }, 1);

            this.modalOptions = {
              backdrop:'static',
              backdropClass:'customBackdrop',
              size: 'lg' 
            }
        




          }

          getUsuario(){   
            const id_persona = localStorage.getItem('id_persona'); 
            this.dataService.getUserId ( id_persona )
              .subscribe( (resp:Personas) => {
                this.user = resp;

              });
          }

          readEventos(){   
            this.eventosService.getEventos()
            .subscribe( (respuesta:any) => {
            this.event=respuesta;
        
              });
          }

          private PHP_API_SERVER = Constantes.API_SERVER; //URL del servicio
          currentEvents: EventApi[] = [];
          calendarVisible = true;
          calendarOptions: CalendarOptions = {
            headerToolbar: {
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            },
            initialView: 'dayGridMonth',
            events: `${this.PHP_API_SERVER}/ajax/read_eventos.php`,
            weekends: true,
            editable: true,
            selectable: true,
            selectMirror: true,
            dayMaxEvents: true,
            locales: [esLocale],
            select: this.handleDateSelect.bind(this),
            eventClick: this.open.bind(this),
            eventsSet: this.handleEvents.bind(this),
           
           // eventAdd:
           // eventChange:this.handleDateSelect.bind(this)
            //eventRemove:
            
          };
  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.handleDateSelect.bind(this);
  }
  handleEventClick(clickInfo: EventClickArg) {
    const identificador = clickInfo.event.id;
  }

  recarga() {
    location.reload();
  }
  
  async handleDateSelect(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
    const { value: title } = await Swal.fire({
     input: 'text',
     inputPlaceholder: 'Escriba el nombre del evento o registro',
     showCancelButton: true,
     html: `<h4>Fecha: ${selectInfo.startStr}</h4><p><small class="smaol">Una vez creado, puede editarlo para añadirle características haciendo click sobre el evento</small></p>`, 
    })
    if (title) {
      const luego = "00:00:00";
      this.valor = JSON.stringify({ "id": createEventId(),"title": title, "start": selectInfo.startStr+ ' '+this.ahora ,"end": selectInfo.endStr+ ' '+luego ,"allDay": selectInfo.allDay});
      this.eventosService.addEvent( this.valor ).subscribe( respuesta => {}), this.recarga(); 
    } 
  }


  open(clickInfo: EventClickArg) {
    const horaPattern = "^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$";
    const id = clickInfo.event.id;
    const title = clickInfo.event.title;

    const start = clickInfo.event.start.toISOString().replace(/T.*$/, '');
    const end = clickInfo.event.end.toISOString().replace(/T.*$/, '');
    
    const descripcion = clickInfo.event.extendedProps.eventos_descripcion;


//if(clickInfo.event.extendedProps.hora_inicio==null){
  //const hora_inicio = setInterval(() => {this.horactual = new Date().toString().split(' ')[4];}, 1); 
//} else {
  const hora_inicio = clickInfo.event.extendedProps.hora_inicio; 
//}
  
    const hora_fin = clickInfo.event.extendedProps.hora_fin;
    this.ModalForm = this.fb.group({
      id: [id],
      title:[title, Validators.required],
      start:[start, Validators.required],
      end: [end, Validators.required],
      eventos_descripcion: [descripcion, Validators.required],
      hora_inicio: [hora_inicio, Validators.pattern(horaPattern)],
      hora_fin: [hora_fin, Validators.pattern(horaPattern)],
    });


    

   


    this.eventosService.getDetalle ( id )
    .subscribe( (respuesta:Eventos) => {
       this.detalle = respuesta;
       console.log(this.detalle);
    });


    this.modalService.open(this.modal,this.modalOptions).result.then((result) => {
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
      return  `with: ${reason}`;
    }
  }






  onSubmit() { 
    this.isSubmitted = true;
    const valor = JSON.stringify(this.ModalForm.value);
    
    this.eventosService.modificarEvento( valor ).subscribe( respuesta => {
      Swal.fire({
        title: 'Evento modificado',
        text: 'El evento se ha modificado con éxito',
        icon: 'success',  
        showConfirmButton : true
      })
      //, this.recarga();
      
    });   
}







  handleEventRemove(clickInfo: EventClickArg) {
    // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.id}'`)) {
    //   clickInfo.event.remove();
    // }
  }


}
