import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { DataSourcesComponent } from './data-sources.component';
import { DataSourcesRoutingModule } from './data-sources-routing.module';
import { DataSourceCreationDialogComponent } from './data-source-creation-dialog/data-source-creation-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    DataSourcesRoutingModule,
  ],
  declarations: [
    DataSourcesComponent,
    DataSourceCreationDialogComponent,
  ],
})
export class DataSourcesModule { }
