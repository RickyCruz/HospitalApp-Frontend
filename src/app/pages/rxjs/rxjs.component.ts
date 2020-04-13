import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

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
        count += 1;
        observer.next(count);

        if (count === 3) {
          clearInterval(interval);
          observer.complete();
        }

        if (count === 2) {
          observer.error('Help!');
        }

      }, 1000);
    });

    observable.subscribe(
      number => console.log('Observer executed correctly ', number),
      error => console.error('Error in observable: ', error),
      () => console.log('The observer finished.')
    );
  }

  ngOnInit() {
  }

}
