import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ExtensionsService } from '@webapp/shared/services';

@Component({
  selector: 'app-visualization-types-dialog',
  templateUrl: './visualization-types-dialog.component.html',
  styleUrls: ['./visualization-types-dialog.component.scss']
})
export class VisualizationTypesDialogComponent implements OnInit {
  public extensions: Array<any> = [];

  constructor(
      private readonly matDialogRef: MatDialogRef<VisualizationTypesDialogComponent, any | undefined>,
      private readonly extensionsService: ExtensionsService) {

  }

  public ngOnInit() {
    this.extensions = this.extensionsService.extensions
      .filter(extension => extension.nature === 'stateful');
  }

  public onChartTypeClick(chartType: any) {
    this.matDialogRef.close(chartType);
  }

}
