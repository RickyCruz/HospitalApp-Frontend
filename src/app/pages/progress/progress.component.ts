import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  progressBlue: number = 10;
  progressGreen: number = 20;

  constructor() { }

  ngOnInit() {
  }

  // updateProgress(event: number) {
  //   console.log('Event: ' + event);
  // }

}
