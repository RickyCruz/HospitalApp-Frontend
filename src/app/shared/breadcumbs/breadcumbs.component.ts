import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcumbs',
  templateUrl: './breadcumbs.component.html',
  styles: []
})
export class BreadcumbsComponent implements OnInit {

  title: string;

  constructor(private router: Router) {
    this.getDataRoute().subscribe(data => {
      // console.log(data);
      this.title = data.title;
    });
  }

  ngOnInit() {
  }

  getDataRoute() {
    return this.router.events
      .pipe(
        filter(event => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data)
      );
  }
}
