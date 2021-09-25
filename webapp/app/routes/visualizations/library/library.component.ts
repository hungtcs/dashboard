import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { VisualizationTypesDialogService } from '../visualization-types-dialog/visualization-types-dialog.service';

@Component({
  selector: 'app-visualizations-library',
  styleUrls: ['./library.component.scss'],
  templateUrl: './library.component.html',
})
export class LibraryComponent {

  public charts = Array.from({ length: 9 }).fill(0);

  constructor(
      private readonly router: Router,
      private readonly visualizationTypesDialogService: VisualizationTypesDialogService) {

  }

  public openChartTypesDialog() {
    const dialogRef = this.visualizationTypesDialogService.open();
    dialogRef.afterClosed()
      .pipe(tap(chartType => {
        if (chartType !== undefined) {
          console.log(chartType);
          this.router.navigate(['/visualizations/create', chartType.id]);
        }
      }))
      .subscribe();
  }

}
