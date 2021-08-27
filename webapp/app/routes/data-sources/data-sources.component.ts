import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataSourceCreationDialogComponent } from './data-source-creation-dialog/data-source-creation-dialog.component';

@Component({
  selector: 'app-data-sources',
  styleUrls: ['./data-sources.component.scss'],
  templateUrl: './data-sources.component.html',
})
export class DataSourcesComponent implements OnInit {

  constructor(
      private readonly dialog: MatDialog) {

  }

  public ngOnInit(): void {

  }

  public openCreationDialog() {
    const dialogRef = this.dialog.open(
      DataSourceCreationDialogComponent,
      {
        panelClass: '',
        disableClose: true,
      },
    );
    dialogRef.afterClosed()
      .subscribe();
  }

}
