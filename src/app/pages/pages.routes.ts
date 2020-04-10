import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { ChartsOneComponent } from './charts-one/charts-one.component';

const pagesRoute: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'charts-one', component: ChartsOneComponent },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
  },
];
export const PAGES_ROUTES = RouterModule.forChild(pagesRoute);
