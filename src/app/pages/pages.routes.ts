import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { ChartsOneComponent } from './charts-one/charts-one.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { LoginGuard } from '../services/service.index'
import { HospitalsComponent } from './hospitals/hospitals.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorComponent } from './doctors/doctor.component';
import { SearchComponent } from './search/search.component';

const pagesRoute: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'progress', component: ProgressComponent, data: { title: 'Progress' } },
      { path: 'charts-one', component: ChartsOneComponent, data: { title: 'Charts One' } },
      { path: 'promises', component: PromisesComponent, data: { title: 'Promises' } },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJS' } },
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Settings' } },
      { path: 'profile', component: ProfileComponent, data: { title: 'Profile' } },
      { path: 'search/:keyword', component: SearchComponent, data: { title: 'Search' } },

      { path: 'users', component: UsersComponent, data: { title: 'Users' } },
      { path: 'hospitals', component: HospitalsComponent, data: { title: 'Hospitals' } },
      { path: 'doctors', component: DoctorsComponent, data: { title: 'Doctors' } },
      { path: 'doctors/:id', component: DoctorComponent, data: { title: 'Doctor' } },

      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
  },
];
export const PAGES_ROUTES = RouterModule.forChild(pagesRoute);
