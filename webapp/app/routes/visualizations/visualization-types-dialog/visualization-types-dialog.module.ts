import { NgModule } from '@angular/core';
import { SharedModule } from '@webapp/shared/shared.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { VisualizationTypesDialogComponent } from './visualization-types-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    MatGridListModule,
  ],
  declarations: [
    VisualizationTypesDialogComponent,
  ],
})
export class VisualizationTypesDialogModule {

}
