import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { API_URL } from '../../config/config';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
  user: User;
  token: string;

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

    if (remember) {
      localStorage.setItem('hemail', user.email);
    } else {
      localStorage.removeItem('hemail');
    }

    return this.http.post(url, user)
      .pipe(
        map((response: any) => {
          this.saveStorage(response.id, response.token, response.user);

          return true;
        })
      );
  }

  private saveStorage(id: string, token:string, user: User) {
    localStorage.setItem('hid', id);
    localStorage.setItem('htoken', token);
    localStorage.setItem('huser', JSON.stringify(user));

    this.user = user;
    this.token = token;
  }
}
