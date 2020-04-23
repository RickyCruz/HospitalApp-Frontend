import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { UserService } from '../user/user.service';
import { Doctor } from 'src/app/models/doctor.model';

@Injectable()
export class DoctorService {

  total: number = 0;

  constructor(public http: HttpClient, public userService: UserService) { }

  fetch(from: number = 0) {
    let url = `${ API_URL }/doctors?from=${ from }`;

    return this.http.get(url).pipe(
      map((response: any) => {
        this.total = response.total;
        return response.doctors;
      })
    );
  }

  show(id: string) {
    let url = `${ API_URL }/doctors/${ id }`;

    return this.http.get(url);
  }

  store(doctor: Doctor) {

    if (doctor._id) {
      let url = `${ API_URL }/doctors/${ doctor._id }?token=${ this.userService.token }`;

      return this.http.patch(url, doctor)
        .pipe(
          map((response: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Doctor edited',
              text: response.doctor.name
            });

            return response.doctor;
          })
        );
    } else {
      let url = `${ API_URL }/doctors?token=${ this.userService.token }`;

      return this.http.post(url, doctor)
        .pipe(
          map((response: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Doctor created',
              text: response.doctor.name
            });

            return response.doctor;
          })
        );
    }
  }

  delete(doctorId: string) {
    let url = `${ API_URL }/doctors/${ doctorId }?token=${ this.userService.token }`;

    return this.http.delete(url).pipe(
      map((response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Doctor deleted',
          text: response.doctor.name
        });

        return response.doctor;
      })
    );
  }

  search(keyword: string) {
    let url = `${ API_URL }/search/collections/doctors/${ keyword }`;

    return this.http.get(url).pipe(
      map((response: any) => {
        return response.doctors;
      })
    );
  }
}
