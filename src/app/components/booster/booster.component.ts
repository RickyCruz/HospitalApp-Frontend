import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-booster',
  templateUrl: './booster.component.html',
  styles: []
})
export class BoosterComponent implements OnInit {

  @Input('label') label: string = 'Label';
  @Input('progress') percentage: number = 50;

  @Output('progressChanged') progressChanged: EventEmitter<number> = new EventEmitter();

  constructor() {
    // console.log('Label: ' + this.label);
    // console.log('Progress: ' + this.percentage);
  }

  ngOnInit() {
    // console.log('Label: ' + this.label);
    // console.log('Progress: ' + this.percentage);
  }

  changeValue(value: number) {
    if (this.percentage >= 100 && value > 0) {
      this.percentage = 100;
      return;
    }

    if (this.percentage <= 0 && value < 0) {
      this.percentage = 0;
      return;
    }

    this.percentage += (value * 1);

    this.progressChanged.emit(this.percentage);
  }

}
