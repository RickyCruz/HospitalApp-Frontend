import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcumbs',
  templateUrl: './breadcumbs.component.html',
  styles: []
})
export class BreadcumbsComponent implements OnInit, OnDestroy {

  title: string;
  titleSubs$: Subscription;

  constructor(private router: Router, private _title: Title, private meta: Meta) {
    this.titleSubs$ = this.getDataRoute().subscribe(data => {
      // console.log(data);
      this.title = data.title;
      this._title.setTitle(this.title);

      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.title
      };

      this.meta.updateTag(metaTag);
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.titleSubs$.unsubscribe();
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
