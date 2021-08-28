import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataSourcesSelectionDialogModule } from './data-sources-selection-dialog.module';

@Injectable({
  providedIn: DataSourcesSelectionDialogModule,
})
export class DataSourcesSelectionDialogService {

  constructor(
      private readonly dialog: MatDialog) {

  }


}
