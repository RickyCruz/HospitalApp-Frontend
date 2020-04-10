import { Component, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styles: []
})
export class ChartComponent {

  @Input('title') chartTitle: string;
  @Input('data') chartData: number[] = [];
  @Input('labels') chartLabels: Label[];
  @Input('type') chartType: ChartType = 'doughnut';

  constructor() { }
}
