import { Pipe, PipeTransform } from '@angular/core';
import { API_URL } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(imgPath: string, type: string = 'user'): any {
    let url = `${ API_URL }/images/`;

    if (! imgPath) {
      return `${ url }/users/xxx`;
    }

    if (imgPath.indexOf('https') >= 0) {
      return imgPath;
    }

    switch(type) {
      case 'user':
        url += '/users/' + imgPath;
      break;
      case 'doctor':
        url += '/doctors/' + imgPath;
      break;
      case 'hospital':
        url += '/hospitals/' + imgPath;
      break;
      default:
        url += '/users/xxx';
      break
    }

    return url;
  }

}
