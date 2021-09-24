import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-data-source-creation-dialog',
  styleUrls: ['./data-source-creation-dialog.component.scss'],
  templateUrl: './data-source-creation-dialog.component.html',
})
export class DataSourceCreationDialogComponent {
  public connectionString = new FormControl(
    '',
    [
      Validators.required,
    ],
  );

  constructor(
      private readonly dialogRef: MatDialogRef<DataSourceCreationDialogComponent, void>) {

  }

  public onConfirmClick() {
    if (this.connectionString.invalid || this.connectionString.pending) {
      this.connectionString.markAsTouched();
      this.connectionString.updateValueAndValidity();
      return;
    }
    this.dialogRef.close();
  }

}
