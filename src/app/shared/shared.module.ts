import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcumbsComponent } from './breadcumbs/breadcumbs.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    BreadcumbsComponent,
    NoPageFoundComponent,
  ],
  imports: [],
  exports: [
    HeaderComponent,
    SidebarComponent,
    BreadcumbsComponent,
    NoPageFoundComponent,
  ],
  providers: [],
  bootstrap: []
})

export class SharedModule { }
