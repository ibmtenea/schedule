

import { Routes, RouterModule} from '@angular/router';

import { HomeComponent } from '../pages/home.component';
import { LoginComponent } from '../pages/login/login.component';
import { AuthguardGuard } from '../guards/authguard.guard';
import { IncidenciasComponent } from '../pages/incidencias.component';
import { CambiosComponent } from '../pages/cambios.component';
import { PendientesComponent } from '../pages/pendientes.component';
import { PerfilComponent } from '../pages/perfil.component';
import { BitacoraComponent } from '../pages/bitacora/bitacora.component';
import { AdministracionComponent } from '../pages/administracion/administracion.component';

import { AuthGuardRole } from '../guards/rol.guard';
import { DetallebitacoraComponent } from '../pages/bitacora/detallebitacora.component';
import { DetallePersonaAdminComponent } from '../pages/administracion/detallepersonaadmin.component';
import { ListaPersonasComponent } from '../pages/administracion/listapersonas.component';
import { IncidenciasappComponent } from '../pages/administracion/incidenciasapp.component';
import { DetalleincidenciaComponent } from '../pages/administracion/detalleincidencia.component';
import { AbririncidenciaComponent } from '../pages/administracion/abririncidencia.component';
import { ReporteglobalComponent } from '../pages/reporteglobal/reporteglobal.component';
import { ListaPersonasMailComponent } from '../pages/administracion/listapersonasmail.component';
import { DetallePersonaMailAdminComponent } from '../pages/administracion/detallepersonamailadmin.component';
import { AyudaComponent } from '../pages/ayuda.component';
import { InformeComponent } from '../pages/informe/informe.component';









export const routes: Routes = [

  { path: 'home' , component: HomeComponent, canActivate: [ AuthguardGuard ] },
  { path: 'informe' , component: InformeComponent, canActivate: [ AuthguardGuard ] },

  
  { path: 'ayuda' , component: AyudaComponent, canActivate: [ AuthguardGuard ] },
  { path: 'incidencias' , component: IncidenciasComponent, canActivate: [ AuthguardGuard ] },
  { path: 'cambios' , component: CambiosComponent, canActivate: [ AuthguardGuard ] },
  { path: 'pendientes' , component: PendientesComponent, canActivate: [ AuthguardGuard ] },
  { path: 'abririncidencia/:id_persona' , component: AbririncidenciaComponent, canActivate: [ AuthguardGuard ] },
  { path: 'bitacora' , component: BitacoraComponent, canActivate: [ AuthGuardRole ] },
  { path: 'detallebitacora/:tokenid' , component: DetallebitacoraComponent, canActivate: [ AuthGuardRole ] },
  { path: 'listapersonas' , component: ListaPersonasComponent, canActivate: [ AuthGuardRole ] },
  { path: 'listapersonasmail' , component: ListaPersonasMailComponent, canActivate: [ AuthGuardRole ] },
  { path: 'detallepersonasmail/:id_persona' , component: DetallePersonaMailAdminComponent, canActivate: [ AuthGuardRole ] },
  { path: 'detallepersonas/:id_persona' , component: DetallePersonaAdminComponent, canActivate: [ AuthGuardRole ] },
  { path: 'administracion' , component: AdministracionComponent, canActivate: [ AuthGuardRole ]},
  { path: 'reporteglobal' , component: ReporteglobalComponent, canActivate: [ AuthGuardRole ]},
  { path: 'incidenciasapp' , component: IncidenciasappComponent, canActivate: [ AuthGuardRole ]},
  { path: 'detalleincidencia/:inci_token' , component: DetalleincidenciaComponent, canActivate: [ AuthGuardRole ]},
  { path: 'perfil/:id' , component: PerfilComponent, canActivate: [ AuthguardGuard ] },
  { path: 'login'   , component: LoginComponent },
  { path: '', pathMatch: 'full', redirectTo: '/login'},
  { path: '**', redirectTo: '/login' }
];


