import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';

declare function initPlugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  remember: boolean = false;

  constructor(public userService: UserService, public router: Router) { }

  ngOnInit() {
    initPlugins();
  }

  logIn(form: NgForm) {
    if (form.invalid) {
      return;
    }

    let user = new User(null, form.value.email, form.value.password);

    this.userService.login(user, form.value.remember)
      .subscribe(response => this.router.navigate(['/dashboard']));
  }

}
