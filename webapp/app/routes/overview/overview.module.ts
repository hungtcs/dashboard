import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview.component';
import { OverviewRoutingModule } from './overview-routing.module';
import { GridsterModule } from 'angular-gridster2';

@NgModule({
  imports: [
    CommonModule,
    GridsterModule,
    OverviewRoutingModule,
  ],
  declarations: [
    OverviewComponent
  ],
})
export class OverviewModule { }
