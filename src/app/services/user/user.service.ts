import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { API_URL } from '../../config/config';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {

  constructor(public http: HttpClient) { }

  createUser(user: User) {
    let url = `${ API_URL }/users`;

    return this.http.post(url, user)
      .pipe(
        map((response: any) => {
          swal('User created', user.email, 'success');

          return response.user;
        })
      );
  }

  login(user: User, remember: boolean = false) {
    let url = `${ API_URL }/login`;

    return this.http.post(url, user)
      .pipe(
        map((response: any) => {
          localStorage.setItem('hid', response.id);
          localStorage.setItem('htoken', response.token);
          localStorage.setItem('huser', JSON.stringify(response.user));

          return true;
        })
      );
  }
}
