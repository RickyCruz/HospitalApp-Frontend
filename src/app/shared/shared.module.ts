import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcumbsComponent } from './breadcumbs/breadcumbs.component';

import { PipesModule } from '../pipes/pipes.module';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';

@NgModule({
  imports:[
    RouterModule,
    CommonModule,
    PipesModule,
  ],
  declarations: [
    HeaderComponent,
    SidebarComponent,
    BreadcumbsComponent,
    NoPageFoundComponent,
    ModalUploadComponent,
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    BreadcumbsComponent,
    NoPageFoundComponent,
    ModalUploadComponent,
  ]
})
export class SharedModule { }
