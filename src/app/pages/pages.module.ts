import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

import { PAGES_ROUTES } from './pages.routes';

// Temporal
import { BoosterComponent } from './../components/booster/booster.component';
import { ChartComponent } from './../components/chart/chart.component';

// Plugins
import { ChartsModule } from 'ng2-charts';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { ChartsOneComponent } from './charts-one/charts-one.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    ChartsOneComponent,
    BoosterComponent,
    ChartComponent,
    AccountSettingsComponent,
    PromisesComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    ChartsOneComponent
  ],
  imports: [
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ChartsModule
  ]
})
export class PagesModule { }
