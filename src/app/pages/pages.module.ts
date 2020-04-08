import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

import { PAGES_ROUTES } from './pages.routes';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphicsOneComponent } from './graphics-one/graphics-one.component';

// Temporal
import { BoosterComponent } from './../components/booster/booster.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    GraphicsOneComponent,
    BoosterComponent,
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    GraphicsOneComponent
  ],
  imports: [
    SharedModule,
    PAGES_ROUTES,
    FormsModule
  ]
})
export class PagesModule { }
