import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcumbsComponent } from './breadcumbs/breadcumbs.component';

@NgModule({
  imports:[
    RouterModule,
    CommonModule
  ],
  declarations: [
    HeaderComponent,
    SidebarComponent,
    BreadcumbsComponent,
    NoPageFoundComponent,
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    BreadcumbsComponent,
    NoPageFoundComponent,
  ]
})
export class SharedModule { }
