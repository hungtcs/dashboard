import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-visualization-types-dialog',
  templateUrl: './visualization-types-dialog.component.html',
  styleUrls: ['./visualization-types-dialog.component.scss']
})
export class VisualizationTypesDialogComponent implements OnInit {

  public chartTypes = [
    {
      code: 'charts',
      icon: 'insert_chart_outlined',
      name: 'Charts',
      description: '柱状图、折线图等'
    },
    {
      code: 'table',
      icon: 'table_chart',
      name: 'Table',
      description: '使用表格展示数据',
    },
    {
      code: 'map',
      icon: 'map',
      name: 'Map',
      description: '适用于地理位置数据，展示在地图上'
    },
  ];

  constructor(
      private readonly matDialogRef: MatDialogRef<VisualizationTypesDialogComponent, any | undefined>) {

  }

  public ngOnInit(): void {
  }

  public onChartTypeClick(chartType: any) {
    this.matDialogRef.close(chartType);
  }

}
