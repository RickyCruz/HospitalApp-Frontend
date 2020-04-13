import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() {
    let observable = new Observable(observer => {
      let count = 0;
      let interval = setInterval(() => {
        count ++;
        observer.next(count);

        if (count === 3) {
          clearInterval(interval);
          observer.complete();
        }

        if (count === 2) {
          // clearInterval(interval);
          observer.error('Help!');
          // Output: 1, 2, 3
          // We need to reset the count
        }

      }, 1000);
    });

    observable
      .pipe(
        retry(2)
      )
      .subscribe(
        number => console.log('Observer executed correctly ', number),
        error => console.error('Error in observable: ', error),
        () => console.log('The observer finished.')
      );
  }

  ngOnInit() {
  }

}
