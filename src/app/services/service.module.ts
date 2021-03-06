import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

import {
  SettingsService,
  SharedService,
  SidebarService,
  UserService,
  LoginGuard,
  UploadFileService,
  HospitalService,
  DoctorService,
  AdminGuard,
  RefreshTokenGuard,
} from './service.index'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UserService,
    LoginGuard,
    UploadFileService,
    ModalUploadService,
    HospitalService,
    DoctorService,
    AdminGuard,
    RefreshTokenGuard
  ]
})
export class ServiceModule { }
