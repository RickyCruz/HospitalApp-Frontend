import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/service.index';
import Swal from 'sweetalert2'
import { User } from '../models/user.model';

declare function initPlugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(public userService: UserService, public router: Router) { }

  ngOnInit() {
    initPlugins();

    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      password2: new FormControl(null, [Validators.required]),
      terms: new FormControl(false),
    }, { validators: this.equals('password', 'password2') });
  }

  registerUser() {
    if (this.form.invalid) { return; }

    if (! this.form.value.terms) {
      Swal.fire({
        icon: 'warning',
        title: 'Whoops!',
        text: 'You have to accept terms of use'
      });
      return;
    }

    let user = new User(
      this.form.value.name, this.form.value.email, this.form.value.password
    );

    this.userService.createUser(user).subscribe(response => {
      this.router.navigate(['/login']);
    });
  }

  equals(fieldOne: string, fieldTwo: string) {
    return (group: FormGroup) => {
      let pwd1 = group.controls[fieldOne].value;
      let pwd2 = group.controls[fieldTwo].value;

      if (pwd1 === pwd2) {
        return null;
      }

      return {
        equals: true
      };
    };
  }
}
