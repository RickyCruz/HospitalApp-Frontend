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
  loading: boolean = true;

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.userService.fetchUsers(this.from)
      .subscribe((response: any) => {
        this.total = response.total;
        this.users = response.users;
        this.loading = false;
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

  search(keyword: string) {

    if (keyword.length <= 0) {
      this.loadUsers();
      return
    }

    this.loading = true;

    this.userService.search(keyword)
      .subscribe((users: User[]) => {
        this.users = users;
        this.loading = false;
      });
  }
}
