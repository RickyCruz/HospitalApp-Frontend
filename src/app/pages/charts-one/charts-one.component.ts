import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-charts-one',
  templateUrl: './charts-one.component.html',
  styles: []
})
export class ChartsOneComponent implements OnInit {
  graphics: any = {
    'one': {
      'labels': ['Beans', 'Custard', 'Bacon'],
      'data':  [24, 30, 46],
      'type': 'doughnut',
      'title': 'The bread is eaten with'
    },
    'two': {
      'labels': ['Mens', 'Women'],
      'data':  [4500, 6000],
      'type': 'doughnut',
      'title': 'Interviewees'
    },
    'three': {
      'labels': ['Yes', 'No'],
      'data':  [95, 5],
      'type': 'doughnut',
      'title': 'Do beans give you gas?'
    },
    'four': {
      'labels': ['No', 'Yes'],
      'data':  [85, 15],
      'type': 'doughnut',
      'title': 'Do you care about the consequences?'
    },
  };

  constructor() { }

  ngOnInit() {
  }

}
