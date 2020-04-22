import { Injectable } from '@angular/core';
import { API_URL } from '../../config/config';

@Injectable()
export class UploadFileService {

  constructor() { }

  upload(file: File, type: string = 'users', id: string) {
    return new Promise((resolve, reject) => {
      let formData = new FormData();

      let xhr = new XMLHttpRequest();

      formData.append('image', file, file.name);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            // console.log('File uploaded.');
            resolve(JSON.parse(xhr.response));
          } else {
            // console.log('File uploaded FAIL!.');
            reject(xhr.response);
          }
        }
      };

      let url = `${ API_URL }/upload/${ type }/${ id }`;

      xhr.open('PATCH', url, true);
      xhr.send(formData);
    });
  }
}
