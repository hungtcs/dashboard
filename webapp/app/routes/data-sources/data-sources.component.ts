import { tap } from 'rxjs';
import { DataSource } from './shared/data-sources.dto';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataSourcesService, DataSourceCreationDialogService } from './shared/index';

@Component({
  selector: 'app-data-sources',
  styleUrls: ['./data-sources.component.scss'],
  templateUrl: './data-sources.component.html',
})
export class DataSourcesComponent implements OnInit {
  public selection = new SelectionModel<DataSource>(true, []);
  public tableDataSource = new MatTableDataSource<DataSource>();
  public displayedColumns = ['select', 'position', 'name', 'connectionString'];

  constructor(
      private readonly dataSourcesService: DataSourcesService,
      private readonly dataSourceCreationDialogService: DataSourceCreationDialogService,) {

  }

  public ngOnInit(): void {
    this.dataSourcesService.getDataSources()
      .pipe(tap(response => {
        this.tableDataSource.data = response.data;
      }))
      .subscribe();
  }

  public openCreationDialog() {
    const dialogRef = this.dataSourceCreationDialogService.open();
    dialogRef.afterClosed()
      .subscribe();
  }

  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.tableDataSource.data.length;
    return numSelected === numRows;
  }

  public masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.tableDataSource.data);
  }

}
