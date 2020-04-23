import { Component, OnInit } from '@angular/core';
import { Doctor } from '../../models/doctor.model';
import { DoctorService } from '../../services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: []
})
export class DoctorsComponent implements OnInit {

  doctors: Doctor[] = [];
  from: number = 0;
  total: number = 0;
  loading: boolean = true;

  constructor(public doctorService: DoctorService) { }

  ngOnInit() {
    this.loadDoctors();
  }

  loadDoctors() {
    this.loading = true;

    this.doctorService.fetch(this.from)
      .subscribe((doctors: Doctor[]) => {
        this.total = this.doctorService.total;
        this.doctors = doctors;
        this.loading = false;
      });
  }

  delete(doctor: Doctor) {
    Swal.fire({
      title: 'Are you sure?',
      text: `If you delete the user ${ doctor.name } you will not be able to recover their data`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.doctorService.delete(doctor._id)
          .subscribe(response => {
            this.loadDoctors();
          });
      }
    });
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
    this.loadDoctors();
  }


  search(keyword: string) {
    if (keyword.length <= 0) {
      this.loadDoctors();
      return
    }

    this.loading = true;

    this.doctorService.search(keyword)
      .subscribe((doctors: Doctor[]) => {
        this.doctors = doctors;
        this.loading = false;
      });
  }

}
