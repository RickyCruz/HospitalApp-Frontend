import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/service.index';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  from: number = 0;
  total: number = 0;

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.fetchUsers(this.from)
      .subscribe((response: any) => {
        this.total = response.total;
        this.users = response.users;
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
    this.loadUsers();
  }

}
