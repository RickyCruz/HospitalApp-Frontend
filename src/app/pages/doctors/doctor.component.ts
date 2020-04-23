import { Component, OnInit } from '@angular/core';
import { HospitalService, DoctorService } from '../../services/service.index';
import { Hospital } from '../../models/hospital.model';
import { Doctor } from 'src/app/models/doctor.model';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: []
})
export class DoctorComponent implements OnInit {

  hospitals: Hospital[] = [];
  doctor: Doctor = new Doctor('', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public hospitalService: HospitalService,
    public doctorService: DoctorService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public modalUploadService: ModalUploadService
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];

      if (id !== 'create') {
        this.show(id);
      }
    })
  }

  ngOnInit() {
    this.hospitalService.fetch().subscribe(
      (hospitals: Hospital[]) => this.hospitals = hospitals
    );
    this.modalUploadService.notification.subscribe(response => {
      this.doctor.img = response.doctor.img;
    });
  }

  show(id: string) {
    this.doctorService.show(id).subscribe((response: any) => {
      this.doctor = response.doctor;
      this.doctor.hospital = response.doctor.hospital._id;

      this.hospitalSelected(this.doctor.hospital);
    });
  }

  save(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.doctorService.store(this.doctor).subscribe((doctor: Doctor) => {
      this.doctor._id = doctor._id;
      this.router.navigate(['/doctors', doctor._id]);
    });
  }

  hospitalSelected(id: string) {
    this.hospitalService.show(id).subscribe(({ hospital }: any) => {
      this.hospital = hospital;
    });
  }

  changeImage() {
    this.modalUploadService.showModal('doctors', this.doctor._id);
  }

}
