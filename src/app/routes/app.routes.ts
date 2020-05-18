

import { Routes} from '@angular/router';

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

export const routes: Routes = [

  { path: 'home' , component: HomeComponent, canActivate: [ AuthguardGuard ] },
  { path: 'incidencias' , component: IncidenciasComponent, canActivate: [ AuthguardGuard ] },
  { path: 'cambios' , component: CambiosComponent, canActivate: [ AuthguardGuard ] },
  { path: 'pendientes' , component: PendientesComponent, canActivate: [ AuthguardGuard ] },
  { path: 'bitacora' , component: BitacoraComponent, canActivate: [ AuthGuardRole ] },
  { path: 'administracion' , component: AdministracionComponent, canActivate: [ AuthGuardRole ]},
  { path: 'perfil/:id' , component: PerfilComponent, canActivate: [ AuthguardGuard ] },
  { path: 'login'   , component: LoginComponent },
  { path: '', pathMatch: 'full', redirectTo: '/login'},
  { path: '**', redirectTo: '/login' }
];


