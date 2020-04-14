import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {
    this.subscription = this.returnObservable()
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  returnObservable(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      let count = 0;
      let interval = setInterval(() => {
        count ++;

        const wrapper = { value: count }

        observer.next(wrapper);

        // if (count === 3) {
        //   clearInterval(interval);
        //   observer.complete();
        // }

        // if (count === 2) {
        //   // clearInterval(interval);
        //   observer.error('Help!');
        //   // Output: 1, 2, 3
        //   // We need to reset the count
        // }
      }, 1000);
    }).pipe(
      map(response => { return response.value; }),
      filter((value, index) => { // Must return a boolean
        // console.log('Filter ', value, index);
        return value % 2 === 1;
      })
    );
  }

}
