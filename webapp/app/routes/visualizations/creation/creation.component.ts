import * as echarts from 'echarts/core';
import { map, tap } from 'rxjs';
import { LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { VisualizationsService } from '../shared/visualizations.service';
import { DataSource, DataSourcesService } from '@webapp/routes/data-sources/shared/index';
import { TooltipComponent, GridComponent } from 'echarts/components';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';

echarts.use([TooltipComponent, GridComponent, LineChart, CanvasRenderer]);

@Component({
  selector: 'app-visualizations-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.scss']
})
export class CreationComponent implements OnInit {
  public loading: number = 0x00;
  public dataSource: DataSource | null = null;
  public dataSourceControl = new FormControl(this.dataSource, [Validators.required]);
  public dataSources: Array<DataSource> = [];

  public chartsOptionGroup = this.formBuilder.group({
    dataQuery: this.formBuilder.group({
      collection: ['', Validators.required],
      type: ['find', Validators.required],
      query: ['', Validators.required],
    }),
    axis: this.formBuilder.group({
      enable: [true],
      xAxis: this.formBuilder.group({
        name: [''],
        type: ['category', Validators.required],
        field: ['', Validators.required],
      }),
      yAxis: this.formBuilder.group({
        name: [''],
        type: ['value', Validators.required],
      }),
    }),
    series: this.formBuilder.array(
      [
        this.formBuilder.group({
          name: ['', Validators.required],
          type: [null, Validators.required],
          field: ['', Validators.required],
        }),
      ],
      [
        Validators.required,
      ],
    ),
  });

  public get chartsSeriesOption() {
    return this.chartsOptionGroup.get('series') as FormArray;
  }

  @ViewChild('previewContainer', { read: ElementRef })
  public chartsPreviewContainer?: ElementRef<HTMLElement>;
  public chartsPreviewInstance?: echarts.ECharts;

  constructor(
      private readonly formBuilder: FormBuilder,
      private readonly dataSourcesService: DataSourcesService,
      private readonly visualizationsService: VisualizationsService,) {

  }

  public ngOnInit(): void {
    this.loading = 1;
    this.dataSourcesService.getDataSources()
      .pipe(map(response => response.data))
      .pipe(tap(data => this.dataSources = data))
      // .pipe(tap(data => this.dataSource = data[0]))
      .subscribe();

    this.chartsOptionGroup.patchValue({
      "dataQuery": {
        "collection": "temperature-and-humidity",
        "type": "find",
        "query": "{}"
      },
      "axis": {
        "enable": true,
        "xAxis": {
          "name": "时间",
          "type": "category",
          "field": "createTime"
        },
        "yAxis": {
          "name": "摄氏度",
          "type": "value"
        }
      },
      "series": [
        {
          "name": "温度",
          "type": "line",
          "field": "temperature"
        }
      ]
    });
  }

  public applyChartsOption() {
    if (this.dataSource === null) {
      return;
    }
    if (!this.chartsPreviewContainer) {
      return;
    }
    if (!this.chartsPreviewInstance) {
      this.chartsPreviewInstance = echarts.init(this.chartsPreviewContainer.nativeElement);
    }

    const options = this.chartsOptionGroup.value;
    const { dataQuery, axis, series } = options;
    const { xAxis, yAxis } = axis;
    const { type, collection } = dataQuery;

    this.dataSourcesService.queryDataFromDataSource(type, collection, this.dataSource.id)
      .pipe(tap(data => {
        this.chartsPreviewInstance!.setOption({
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

  public saveVisualization() {
    if (this.dataSource === null) {
      return;
    }
    const options = this.chartsOptionGroup.value;
    this.visualizationsService.createVisualization({
      ...options,
      name: '温度',
      dataSource: this.dataSource.id,
    }).subscribe();
    // const dialogRef = this.dialog.open(
    //   VisualizationSaveDialogComponent,
    //   {
    //     disableClose: true,
    //   },
    // );
    // dialogRef.afterClosed()
    //   .pipe(tap())
    //   .subscribe();
  }

}
