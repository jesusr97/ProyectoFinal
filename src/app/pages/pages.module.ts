import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modulos
// import { SharedModule } from '../shared/shared.module';
// import { ComponentsModule } from '../components/components.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { SharedModule } from '../shared/shared.module';
import { PerfilComponent } from './perfil/perfil.component';





@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        PagesComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        PerfilComponent,
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        PagesComponent,
        AccountSettingsComponent
    ],
    imports: [
        SharedModule,
        RouterModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class PagesModule { }
