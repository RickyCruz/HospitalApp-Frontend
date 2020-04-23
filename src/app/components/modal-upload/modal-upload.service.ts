import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ModalUploadService {

  public resourceType: string;
  public id: string;
  public hidden: string = 'ninja';

  public notification = new EventEmitter<any>();

  constructor() {
  }

  hideModal() {
    this.hidden = 'ninja';
    this.id = null;
    this.resourceType = null;
  }

  showModal(resourceType: string, id: string) {
    this.hidden = '';
    this.id = id;
    this.resourceType = resourceType;
  }

}
