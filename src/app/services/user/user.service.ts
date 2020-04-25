import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { API_URL } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { UploadFileService } from '../upload/upload-file.service';
import { throwError } from 'rxjs';

@Injectable()
export class UserService {
  user: User;
  token: string;
  menu: any[] = [];

  constructor(public http: HttpClient,  public router: Router, public uploadFileService: UploadFileService) {
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
        }),

        catchError(response => {
          Swal.fire({
            icon: 'error',
            title: response.error.message,
            text: response.error.errors.message
          });

          return throwError(response);
        })
      );
  }

  updateUser(user: User) {
    let url = `${ API_URL }/users/${ user._id }?token=${ this.token }`;

    return this.http.patch(url, user)
      .pipe(
        map((response: any) => {
          if (user._id === this.user._id) {
            this.saveStorage(response.user._id, this.token, response.user, response.menu);
          }

          Swal.fire({
            icon: 'success',
            title: 'User updated'
          });

          return response.user;
        }),

        catchError(response => {
          Swal.fire({
            icon: 'error',
            title: response.error.message,
            text: response.error.errors.message
          });

          return throwError(response);
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
          this.saveStorage(response.id, response.token, response.user, response.menu);

          return true;
        }),

        catchError(response => {
          Swal.fire({
            icon: 'error',
            title: 'Whoops!',
            text: response.error.message
          });

          return throwError({ code: response.status, message: response.error.message });
        })
      );
  }

  logout() {
    this.user = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('htoken');
    localStorage.removeItem('huser');
    localStorage.removeItem('hmenu');

    this.router.navigate(['/login']);
  }

  loadFromStorage() {
    if (localStorage.getItem('htoken')) {
      this.token = localStorage.getItem('htoken');
      this.user = JSON.parse(localStorage.getItem('huser'));
      this.menu = JSON.parse(localStorage.getItem('hmenu'));
    } else {
      this.token = '';
      this.user = null;
      this.menu = [];
    }
  }

  isAuthenticated(): boolean {
    return this.token.length > 5;
  }

  private saveStorage(id: string, token:string, user: User, menu: any) {
    localStorage.setItem('hid', id);
    localStorage.setItem('htoken', token);
    localStorage.setItem('huser', JSON.stringify(user));
    localStorage.setItem('hmenu', JSON.stringify(menu));

    this.user = user;
    this.token = token;
    this.menu = menu;
  }

  changeAvatar(file: File, id: string) {
    this.uploadFileService.upload(file, 'users', id)
      .then((response: any) => {
        // console.log(response);
        this.user.img = response.user.img;

        Swal.fire({
          icon: 'success',
          title: 'Image profile updated'
        });

        this.saveStorage(id, this.token, this.user, this.menu);
      })
      .catch(error => {
        // console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'An error occurred while uploading the image'
        });
      });
  }

  fetchUsers(from: number = 0) {
    let url = `${ API_URL }/users?from=${ from }`;

    return this.http.get(url);
  }

  search(keyword: string) {
    let url = `${ API_URL }/search/collections/users/${ keyword }`;

    return this.http.get(url).pipe(
      map((response: any) => {
        return response.users;
      })
    );
  }

  delete(userId: string) {
    let url = `${ API_URL }/users/${ userId }?token=${ this.token }`;

    return this.http.delete(url);
  }
}
