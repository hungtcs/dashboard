import * as echarts from 'echarts';
import moment from 'moment';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { CompactType, DisplayGrid, GridsterComponent, GridsterConfig, GridsterItem, GridType } from 'angular-gridster2';
import { debounceTime, interval, Subject, switchMap, tap, timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  private containerResize = new Subject<void>();

  @ViewChild('container', { static: true })
  public container!: ElementRef<HTMLElement>;

  @ViewChild('gridster', { read: GridsterComponent, static: true })
  public gridster!: GridsterComponent;

  public gridsterOptions: GridsterConfig = {
    setGridSize: true,

    gridType: GridType.VerticalFixed,
    displayGrid: DisplayGrid.None,
    // displayGrid: DisplayGrid.OnDragAndResize,
    compactType: CompactType.CompactUp,
    disableScrollHorizontal: true,

    pushItems: true,
    pushDirections: { north: false, east: false, south: true, west: false },

    minCols: 4,
    maxCols: 4,
    minRows: 1,
    fixedRowHeight: 300,

    minItemCols: 2,
    minItemRows: 1,
    maxItemCols: 4,
    maxItemRows: 2,
    margin: 16,

    // mobileBreakpoint: 959.98,

    // swap: true,
    draggable: {
      enabled: true,
      ignoreContent: false,
      // ignoreContentClass: 'gridstar-drag-ignore',
      // dragHandleClass: 'applet-wrapper-drag-handle',
    },
    resizable: {
      enabled: true,
    },

    keepFixedHeightInMobile: true,

    initCallback: () => {
      console.log('initCallback');

    },
    itemInitCallback: (item, itemComponent) => {
      console.log('itemInitCallback', { item, itemComponent });

      if(item.id === 1) {
        this.initCharts();
      }

    },
    gridSizeChangedCallback: () => {
      console.log('gridSizeChangedCallback');
    },
  };

  public items: Array<GridsterItem> = [
    {
      x: 0,
      y: 0,
      cols: 2,
      rows: 1,
    },
    {
      x: 0,
      y: 0,
      cols: 2,
      rows: 1,
    }
  ];

  constructor(
      private readonly http: HttpClient,
      private readonly ngZone: NgZone,
      private readonly elementRef: ElementRef<HTMLElement>) {

  }

  ngOnInit(): void {
    const resizeObserver = new ResizeObserver(
      () => {
        this.containerResize.next();
      },
    );
    resizeObserver.observe(this.elementRef.nativeElement);

    this.containerResize
      // .pipe(debounceTime(128))
      .pipe(tap(() => {
        window.requestAnimationFrame(() => {
          this.gridster.options.api?.resize?.();
        });
      }))
      .subscribe();
  }

  private initCharts() {
    const instance = echarts.init(
      this.container.nativeElement,
    );
    instance.setOption({
      title: {
        text: '最近12小时温湿度数据'
      },
      tooltip: {
        confine: true,
      },
      legend: {
        data:['温度', '湿度'],
        top: 'bottom'
      },
      xAxis: {},
      yAxis: {},
      series: [],
    });
    const resizeObserver = new ResizeObserver(
      () => {
        window.requestAnimationFrame(() => {
          this.ngZone.runOutsideAngular(() => {
            instance.resize()
          });
        });
      },
    );
    resizeObserver.observe(this.container.nativeElement);

    timer(0, 1000 * 20 * 2)
      .pipe(switchMap(() => this.http.get<Array<any>>(
        'http://192.168.10.10:1880/th',
        {
          params: {
            after: moment().subtract(12, 'hours').toISOString(),
          }
        },
      )))
      .pipe(tap(data => {
        instance.setOption({
          tooltip: {
            trigger: 'axis',
            formatter: '{b}<br/>{a0}: {c0}°C<br/>{a1}: {c1}%',
          },
          xAxis: {
            name: '时间',
            type: 'category',
            data: data.map(item => moment(item.createTime).format('HH:mm:ss')),
          },
          yAxis: [
            {
              max: 60,
              name: '°C',
              splitNumber: 5,
              interval: 60 / 5,
            },
            {
              name: '%',
              max: 100,
              min: 0,
              splitNumber: 5,
              interval: 20,
            }
          ],
          series: [
            {
              type: 'line',
              name: '温度',
              data: data.map(item => item.temperature),
            },
            {
              type: 'line',
              name: '湿度',
              data: data.map(item => item.humidity),
              yAxisIndex: 1,
            }
          ],
        });

        console.log(instance.getOption());

      }))
      .subscribe();
  }

}
