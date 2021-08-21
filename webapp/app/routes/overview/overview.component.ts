import * as echarts from 'echarts';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  @ViewChild('container', { static: true })
  public container!: ElementRef<HTMLElement>;

  constructor() { }

  ngOnInit(): void {
    const instance = echarts.init(
      this.container.nativeElement,
    );
    instance.setOption({
      title: {
          text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
          data:['销量']
      },
      xAxis: {
          data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
      },
      yAxis: {},
      series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
      }]
    });
  }

}
