import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridsterModule } from 'angular-gridster2';
import { VisualizationsSharedModule } from '@webapp/routes/visualizations/shared';
import { CustomizableDashboardComponent } from './customizable-dashboard/customizable-dashboard.component';
import { VisualizationWrapperComponent } from './visualization-wrapper/visualization-wrapper.component';

@NgModule({
  imports: [
    CommonModule,
    GridsterModule,
    VisualizationsSharedModule,
  ],
  exports: [
    CustomizableDashboardComponent,
  ],
  declarations: [
    CustomizableDashboardComponent,
    VisualizationWrapperComponent,
  ],
})
export class LayoutableModule {

}
