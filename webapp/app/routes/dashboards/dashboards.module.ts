import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@webapp/shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { DashboardsComponent } from './dashboards.component';
import { DashboardSharedModule } from './shared/shared.module';
import { DashboardsRoutingModule } from './dashboards-routing.module';
import { VisualizationsPoolComponent } from './visualizations-pool/visualizations-pool.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatMenuModule,
    DashboardSharedModule,
    DashboardsRoutingModule,
  ],
  declarations: [
    DashboardsComponent,
    VisualizationsPoolComponent
  ],
})
export class DashboardsModule {

}
