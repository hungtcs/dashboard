import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize, tap } from 'rxjs';
import { ChartTypesDialogComponent } from './chart-types-dialog/chart-types-dialog.component';

@Component({
  selector: 'app-charts',
  styleUrls: ['./charts.component.scss'],
  templateUrl: './charts.component.html',
})
export class ChartsComponent implements OnInit {

  public charts = Array.from({ length: 9 }).fill(0);

  constructor(
      private readonly router: Router,
      private readonly dialog: MatDialog) {

  }

  ngOnInit(): void {
  }

  public openChartTypesDialog() {
    const dialogRef = this.dialog.open(
      ChartTypesDialogComponent,
    );
    dialogRef.afterClosed()
      .pipe(tap(chartType => {
        if(chartType !== undefined) {
          console.log(chartType);
          this.router.navigate(['/charts/create', chartType.code]);
        }
      }))
      .subscribe();
  }

}
