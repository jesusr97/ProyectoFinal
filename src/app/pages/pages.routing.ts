import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
// import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

//Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { OcupacionComponent } from './mantenimientos/ocupacion/ocupacion.component';
import { ServiciosComponent } from './mantenimientos/servicios/servicios.component';
import { TrabajosComponent } from './mantenimientos/trabajos/trabajos.component';

const routes: Routes = [
    { 
        path: 'inicio', 
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            // { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta' }},
            { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de Usuario' }},
            // { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' }},
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' }},
            // { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' }},

            //Mantenimientos
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios' }},
            { path: 'ocupacion', component: OcupacionComponent, data: { titulo: 'Ocupaciones' }},
            { path: 'servicios', component: ServiciosComponent, data: { titulo: 'Servicios' }},
            { path: 'trabajos', component: TrabajosComponent, data: { titulo: 'Trabajos' }},

        ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}


