import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VisualizationTypesDialogModule } from './visualization-types-dialog.module';
import { VisualizationTypesDialogComponent } from './visualization-types-dialog.component';

@Injectable({
  providedIn: VisualizationTypesDialogModule,
})
export class VisualizationTypesDialogService {

  constructor(
      private readonly dialog: MatDialog) {

  }

  public open() {
    return this.dialog.open(VisualizationTypesDialogComponent);
  }


}
