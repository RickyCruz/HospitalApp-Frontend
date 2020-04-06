import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphicsOneComponent } from './graphics-one/graphics-one.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    GraphicsOneComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    GraphicsOneComponent
  ],
  providers: [],
  bootstrap: [],
})

export class PagesModule { }
