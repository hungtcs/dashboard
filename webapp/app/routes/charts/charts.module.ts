import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ChartsComponent } from './charts.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { ChartsRoutingModule } from './charts-routing.module';
import { ChartTypesDialogComponent } from './chart-types-dialog/chart-types-dialog.component';
import { CreationComponent } from './creation/creation.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatGridListModule,
    ChartsRoutingModule,
  ],
  declarations: [
    ChartsComponent,
    ChartTypesDialogComponent,
    CreationComponent
  ],
})
export class ChartsModule { }
