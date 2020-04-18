import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { API_URL } from '../../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2'

@Injectable()
export class UserService {
  user: User;
  token: string;

  constructor(public http: HttpClient, public router: Router) {
    this.loadFromStorage();
  }

  createUser(user: User) {
    let url = `${ API_URL }/users`;

    return this.http.post(url, user)
      .pipe(
        map((response: any) => {
          Swal.fire({
            icon: 'success',
            title: 'User created',
            text: user.email
          });

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

  logout() {
    this.user = null;
    this.token = '';

    localStorage.removeItem('htoken');
    localStorage.removeItem('huser');

    this.router.navigate(['/login']);
  }

  loadFromStorage() {
    if (localStorage.getItem('htoken')) {
      this.token = localStorage.getItem('htoken');
      this.user = JSON.parse(localStorage.getItem('huser'));
    } else {
      this.token = '';
      this.user = null;
    }
  }

  isAuthenticated(): boolean {
    return this.token.length > 5;
  }

  private saveStorage(id: string, token:string, user: User) {
    localStorage.setItem('hid', id);
    localStorage.setItem('htoken', token);
    localStorage.setItem('huser', JSON.stringify(user));

    this.user = user;
    this.token = token;
  }
}
