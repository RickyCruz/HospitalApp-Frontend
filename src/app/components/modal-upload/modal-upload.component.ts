import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UploadFileService } from 'src/app/services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imageSelected: File;
  temporaryImage: string | ArrayBuffer;

  constructor(public uploadService: UploadFileService, public modalUploadService: ModalUploadService) { }

  ngOnInit() {
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

  private imagePreview(file: File) {
    let reader = new FileReader();
    let urlImage = reader.readAsDataURL(file);

    reader.onloadend = () => {
      // console.log(reader.result);
      this.temporaryImage = reader.result;
    };
  }

  uploadImage() {
    this.uploadService.upload(this.imageSelected, this.modalUploadService.resourceType, this.modalUploadService.id)
      .then(response => {
        this.modalUploadService.notification.emit(response);
        this.modalUploadService.hideModal();
        this.closeModal();
      })
      .catch(err => {

      });
  }

  closeModal() {
    this.temporaryImage = null;
    this.imageSelected = null;
    this.modalUploadService.hideModal();
  }

}
