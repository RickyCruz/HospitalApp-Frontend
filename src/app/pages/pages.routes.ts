import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { ChartsOneComponent } from './charts-one/charts-one.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const pagesRoute: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'progress', component: ProgressComponent, data: { title: 'Progress' } },
      { path: 'charts-one', component: ChartsOneComponent, data: { title: 'Charts One' } },
      { path: 'promises', component: PromisesComponent, data: { title: 'Promises' } },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJS' } },
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Settings' } },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
  },
];
export const PAGES_ROUTES = RouterModule.forChild(pagesRoute);
