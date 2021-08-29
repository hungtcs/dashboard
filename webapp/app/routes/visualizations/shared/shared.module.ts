import { NgModule } from '@angular/core';
import { VisualizationRenderModule } from './visualization-render/visualization-render.module';

@NgModule({
  imports: [
    VisualizationRenderModule,
  ],
  exports: [
    VisualizationRenderModule,
  ],
})
export class VisualizationsSharedModule {

}
