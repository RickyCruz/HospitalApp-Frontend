import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/service.index';
import Swal from 'sweetalert2';

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

  delete(user: User) {
    if (user._id === this.userService.user._id) {
      Swal.fire({
        icon: 'error',
        title: 'Whoops!',
        text: 'You can\'t delete yourself'
      });

      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: `If you delete the user ${ user.name } you will not be able to recover their data`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.userService.delete(user._id)
          .subscribe(response => {
            this.loadUsers();

            Swal.fire(
              'Deleted!',
              `User ${ user.name } has been deleted`,
              'success'
            );
          });
      }
    });

  }
}
