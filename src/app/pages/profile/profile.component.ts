import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  user: User;
  imageSelected: File;
  temporaryImage: string;

  constructor(private userService: UserService) {
    this.user = this.userService.user;
  }

  ngOnInit() {
  }

  update(user: User) {
    this.user.name = user.name;
    this.user.email = user.email;

    this.userService.updateUser(this.user)
      .subscribe();
  }

  imageWasSelected(file: File) {
    if (! file) {
      this.imageSelected = null;

      return;
    }

    if (file.type.indexOf('image') < 0) {
      Swal.fire({
        icon: 'error',
        title: 'You must select an image'
      });

      this.imageSelected = null;

      return;
    }

    this.imageSelected = file;

    this.imagePreview(this.imageSelected);
  }

  changeImage() {
    this.userService.changeAvatar(this.imageSelected, this.user._id);
  }

  private imagePreview(file: File) {
    let reader = new FileReader();
    let urlImage = reader.readAsDataURL(file);

    reader.onloadend = () => {
      // console.log(reader.result);
      this.temporaryImage = reader.result;
    };
  }

}
