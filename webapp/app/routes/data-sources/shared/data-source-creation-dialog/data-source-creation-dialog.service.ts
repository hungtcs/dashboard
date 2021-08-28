import { MatDialog } from "@angular/material/dialog";
import { Injectable } from "@angular/core";
import { DataSourceCreationDialogModule } from "./data-source-creation-dialog.module";
import { DataSourceCreationDialogComponent } from "./data-source-creation-dialog.component";

@Injectable({
  providedIn: DataSourceCreationDialogModule,
})
export class DataSourceCreationDialogService {

  constructor(
      private readonly dialog: MatDialog) {

  }

  public open() {
    return this.dialog.open(
      DataSourceCreationDialogComponent,
      {
        panelClass: '',
        disableClose: true,
      },
    );
  }

}
