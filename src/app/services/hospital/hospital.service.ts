import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../config/config';
import { map } from 'rxjs/operators';
import { Hospital } from '../../models/hospital.model';
import Swal from 'sweetalert2';
import { UserService } from '../user/user.service';

@Injectable()
export class HospitalService {

  total: number = 0;

  constructor(public http: HttpClient, public userService: UserService) {
  }

  fetch(from: number = 0) {
    let url = `${ API_URL }/hospitals?from=${ from }`;

    return this.http.get(url).pipe(
      map((response: any) => {
        this.total = response.total;
        return response.hospitals;
      })
    );
  }

  show(id: string) {
    let url = `${ API_URL }/hospitals/${ id }`;

    return this.http.get(url);
  }

  store(name: string) {
    let url = `${ API_URL }/hospitals?token=${ this.userService.token }`;

    return this.http.post(url, { name })
      .pipe(
        map((response: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Hospital created',
            text: response.hospital.name
          });

          return response.hospital;
        })
      );
  }

  update(hospital: Hospital) {
    let url = `${ API_URL }/hospitals/${ hospital._id }?token=${ this.userService.token }`;

    return this.http.patch(url, hospital)
      .pipe(
        map((response: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Hospital updated'
          });

          return response.hospital;
        })
      );
  }

  delete(hospitalId: string) {
    let url = `${ API_URL }/hospitals/${ hospitalId }?token=${ this.userService.token }`;

    return this.http.delete(url).pipe(
      map((response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Hospital deleted',
          text: response.hospital.name
        });

        return response.hospital;
      })
    );
  }

  search(keyword: string) {
    let url = `${ API_URL }/search/collections/hospitals/${ keyword }`;

    return this.http.get(url).pipe(
      map((response: any) => {
        return response.hospitals;
      })
    );
  }

}
