import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/service.index';
import { Hospital } from '../../models/hospital.model';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospitals.component.html',
  styles: []
})
export class HospitalsComponent implements OnInit {

  hospitals: Hospital[] = [];
  from: number = 0;
  total: number = 0;
  loading: boolean = true;

  constructor(public hospitalService: HospitalService, public modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.loadHospitals();
    this.modalUploadService.notification.subscribe(response => this.loadHospitals());
  }

  loadHospitals() {
    this.loading = true;

    this.hospitalService.fetch(this.from)
      .subscribe((hospitals: Hospital[]) => {
        this.total = this.hospitalService.total;
        this.hospitals = hospitals;
        this.loading = false;
      });
  }

  create() {
    Swal.fire({
      title: 'Create Hospital',
      text: 'Name',
      input: 'text',
      showCancelButton: true,
      inputValidator: (value) => {
        if (! value) {
          return 'You need to write something!'
        }
      }
    }).then((result) => {
      if (result.value) {
        this.hospitalService.store(result.value)
          .subscribe(response => {
            this.loadHospitals();
          });
      }
    });
  }

  update(hospital: Hospital) {
    this.hospitalService.update(hospital).subscribe();
  }

  delete(hospital: Hospital) {
    Swal.fire({
      title: 'Are you sure?',
      text: `If you delete the user ${ hospital.name } you will not be able to recover their data`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.hospitalService.delete(hospital._id)
          .subscribe(response => {
            this.loadHospitals();
          });
      }
    });
  }

  changeImage(hospital: Hospital) {
    this.modalUploadService.showModal('hospitals', hospital._id);
  }

  paginate(perPage: number) {
    let from = this.from + perPage;

    if (from >= this.total) {
      return;
    }

    if (from < 0) {
      return;
    }

    this.from += perPage;
    this.loadHospitals();
  }

  search(keyword: string) {
    if (keyword.length <= 0) {
      this.loadHospitals();
      return
    }

    this.loading = true;

    this.hospitalService.search(keyword)
      .subscribe((hospitals: Hospital[]) => {
        this.hospitals = hospitals;
        this.loading = false;
      });
  }

}
