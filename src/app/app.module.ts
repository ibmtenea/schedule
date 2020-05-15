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
import { R4bComponent } from './pages/home/r4b.component';
import { ControlesbatchComponent } from './pages/home/controlesbatch.component';
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

const config: SocketIoConfig = { url: environment.wsUrl, options: {} };

registerLocaleData(localeEs, 'es');


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}




@NgModule({
  declarations: [

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
    PeriodosanterioresComponent
    
  ],
  imports: [
    BrowserModule,
 
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
    })
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
