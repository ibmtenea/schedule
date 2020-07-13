import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID,NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { routes } from './routes/app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {JpImagePreloadModule} from '@jaspero/ng-image-preload';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {environment} from '../environments/environment';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { HomeComponent } from './pages/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RouterModule } from '@angular/router';
import { DataserviceService } from './services/dataservice.service';
import { HeaderComponent } from './components/header.component';
import { FooterComponent } from './components/footer.component';
import { BotonestabComponent } from './components/botonestab.component';
import { IncidenciasComponent } from './pages/incidencias.component';
import { CambiosComponent } from './pages/cambios.component';
import { PendientesComponent } from './pages/pendientes.component';
import { PerfilComponent } from './pages/perfil.component';
import { MatTabsModule } from '@angular/material/tabs';

import { ResumenComponent } from './pages/home/resumen.component';
import { DefconComponent } from './pages/incidencias/defcon.component';
import { CriticasComponent } from './pages/incidencias/criticas.component';
import { OficinatelefoniaComponent } from './pages/incidencias/oficinatelefonia.component';
import { TicketingComponent } from './pages/incidencias/ticketing.component';
import { ScheduleComponent } from './pages/pendientes/schedule.component';
import { ProvocanincidenciaComponent } from './pages/cambios/provocanincidencia.component';
import { CambioscriticosComponent } from './pages/cambios/cambioscriticos.component';
import { AmbitofuncionalComponent } from './pages/pendientes/disaster/ambitofuncional.component';
import { InfrcomunicacionesComponent } from './pages/pendientes/disaster/infrcomunicaciones.component';
import { MonitorizacionComponent } from './pages/pendientes/disaster/monitorizacion.component';
import { CitrixComponent } from './pages/pendientes/disaster/citrix.component';
import { DiscoveryComponent } from './pages/pendientes/disaster/discovery.component';
import { SeguimientosemanalComponent } from './pages/pendientes/disaster/seguimientosemanal.component';
import { PeriodosanterioresComponent } from './pages/home/periodosanteriores.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { InPlaceEditorModule } from '@syncfusion/ej2-angular-inplace-editor';
import { RocketEditModule } from 'rocket-edit';
import { BitacoraComponent } from './pages/bitacora/bitacora.component';
import { AdministracionComponent } from './pages/administracion/administracion.component';

import { NgxSpinnerModule } from "ngx-spinner";

import { ControlesbatchComponent } from './pages/home/controlesbatch.component';
import { R4bComponent } from './pages/home/r4b.component';
import { DetallebitacoraComponent } from './pages/bitacora/detallebitacora.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListaPersonasComponent } from './pages/administracion/listapersonas.component';
import { ListaPersonasMailComponent } from './pages/administracion/listapersonasmail.component';
import { DetallePersonaAdminComponent } from './pages/administracion/detallepersonaadmin.component';
import { DetallePersonaMailAdminComponent} from './pages/administracion/detallepersonamailadmin.component';

import { ImprimirComponent } from './components/imprimir.component';
import { IncidenciasappComponent } from './pages/administracion/incidenciasapp.component';
import { DetalleincidenciaComponent } from './pages/administracion/detalleincidencia.component';
import { AbririncidenciaComponent } from './pages/administracion/abririncidencia.component';
import { ReporteglobalComponent } from './pages/reporteglobal/reporteglobal.component';
import { ChecktaskComponent } from './pages/reporteglobal/components/checktask/checktask.component';
import { CambiosaplicadosComponent } from './pages/reporteglobal/components/cambiosaplicados/cambiosaplicados.component';
import { ReportincidenciasComponent } from './pages/reporteglobal/components/reportincidencias/reportincidencias.component';
import { FieldErrorDisplayComponent } from './pages/field-error-display.component';
import { AyudaComponent } from './pages/ayuda.component';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { CambiosGenericaComponent } from './pages/cambios/cambiosgenerica.component';
import { SanitizeHtmlDirective } from './sanitize-html.directive';
import { InformeComponent } from './pages/informe/informe.component';



import { CommonModule } from '@angular/common';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { MonthModule } from './pages/calendario/month/month.module';
import { PlanningComponent } from './pages/planning/planning.component';


import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
])

//import { PdfViewerModule } from 'ng2-pdf-viewer';

const config: SocketIoConfig = { url: environment.wsUrl, options: {} };

registerLocaleData(localeEs, 'es');


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}




@NgModule({
  declarations: [
    DetallePersonaAdminComponent,
    DetallePersonaMailAdminComponent,
    ListaPersonasComponent,
    ListaPersonasMailComponent,
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    BotonestabComponent,
    IncidenciasComponent,
    CambiosComponent,
    PendientesComponent,
    PerfilComponent,
    R4bComponent,
    ControlesbatchComponent,
    ResumenComponent,
    DefconComponent,
    CriticasComponent,
    OficinatelefoniaComponent,
    TicketingComponent,
    ScheduleComponent,
    ProvocanincidenciaComponent,
    CambioscriticosComponent,
    AmbitofuncionalComponent,
    InfrcomunicacionesComponent,
    MonitorizacionComponent,
    CitrixComponent,
    DiscoveryComponent,
    SeguimientosemanalComponent,
    PeriodosanterioresComponent,
    BitacoraComponent,
    AdministracionComponent,
    DetallebitacoraComponent,
    ImprimirComponent,
    IncidenciasappComponent,
    DetalleincidenciaComponent,
    AbririncidenciaComponent,
    ReporteglobalComponent,
    ChecktaskComponent,
    CambiosaplicadosComponent,
    ReportincidenciasComponent,
    FieldErrorDisplayComponent,
    AyudaComponent,
    CambiosGenericaComponent,
    SanitizeHtmlDirective,
    InformeComponent,
    PlanningComponent
    
  ],
  imports: [
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    BrowserModule,
    NgxSpinnerModule,
    RocketEditModule,
    ClickOutsideModule,
    MatTabsModule,
    InPlaceEditorModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DragDropModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    JpImagePreloadModule.forRoot(),
    MatSortModule,
    AngularEditorModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, { useHash: true }),
    NgxDatatableModule,
    SocketIoModule.forRoot(config),
    CKEditorModule,
  
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgbModule,
    MonthModule,
    FullCalendarModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    DataserviceService,
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
