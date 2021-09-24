import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { Visualization } from '../interfaces';
import { CanvasRenderer } from 'echarts/renderers';
import { TooltipComponent, GridComponent } from 'echarts/components';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DataSourcesService } from '@webapp/routes/data-sources/shared/index';
import { tap } from 'rxjs';

echarts.use([TooltipComponent, GridComponent, LineChart, CanvasRenderer]);

@Component({
  selector: 'app-visualization-render',
  styleUrls: ['./visualization-render.component.scss'],
  templateUrl: './visualization-render.component.html',
})
export class VisualizationRenderComponent implements OnInit {
  private chartsInstance?: echarts.ECharts;

  @Input()
  public visualization!: Visualization;

  @ViewChild('container', { static: true })
  public container!: ElementRef<HTMLElement>;

  constructor(
      private readonly dataSourcesService: DataSourcesService,) {

  }

  public ngOnInit(): void {
    this.chartsInstance = echarts.init(this.container.nativeElement);

    const { dataSource, dataQuery, axis, series } = this.visualization;
    const { xAxis, yAxis } = axis;
    const { type, collection } = dataQuery;

    this.dataSourcesService.queryDataFromDataSource(type, collection, dataSource.id)
      .pipe(tap(data => {
        this.chartsInstance!.setOption({
          xAxis: {
            name: xAxis.name,
            type: xAxis.type,
            data: data.map(item => item[xAxis.field]),
          },
          yAxis: {
            name: yAxis.name,
            type: yAxis.type,
          },
          series: series.map((serie: any) => {
            return {
              name: serie.name,
              type: serie.type,
              data: data.map(item => item[serie.field]),
            };
          }),
          tooltip: {
            trigger: 'axis'
          },
        });
      }))
      .subscribe();
  }

  public onContainerResize() {
    this.chartsInstance?.resize();
  }

}
