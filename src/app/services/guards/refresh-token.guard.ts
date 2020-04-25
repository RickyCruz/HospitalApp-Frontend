import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(): Promise<boolean> | boolean {

    let token = this.userService.token;
    let playload = JSON.parse(atob(token.split('.')[1]));

    let expired = this.isTokenExpired(playload.exp);

    if (expired) {
      this.router.navigate(['/login']);

      return false;
    }


    return this.requestNewToken(playload.exp);
  }

  isTokenExpired(date: number) {
    let now = new Date().getTime() / 1000;

    return (date < now) ? true : false;
  }

  requestNewToken(date: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let tokenExp = new Date(date * 1000);
      let now = new Date();

      now.setTime(now.getTime() + (1 * 60 * 60 * 1000));

      if (tokenExp.getTime() > now.getTime()) {
        resolve(true);
      } else {
        this.userService.refreshToken().subscribe(
          () => resolve(true),
          () => reject(false)
        );
      }
    });
  }

}
