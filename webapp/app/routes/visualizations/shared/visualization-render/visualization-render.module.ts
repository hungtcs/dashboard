import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@webapp/shared/shared.module';
import { VisualizationRenderComponent } from './visualization-render.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    VisualizationRenderComponent,
  ],
  declarations: [
    VisualizationRenderComponent,
  ],
})
export class VisualizationRenderModule {

}
