import { NgModule } from '@angular/core';
import { SharedModule } from '@webapp/shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { LibraryComponent } from './library/library.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { CreationComponent } from './creation/creation.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { VisualizationsComponent } from './visualizations.component';
import { VisualizationsRoutingModule } from './visualizations-routing.module';
import { VisualizationTypesDialogModule } from './visualization-types-dialog/visualization-types-dialog.module';
import { VisualizationSaveDialogComponent } from './visualization-save-dialog/visualization-save-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    MatDialogModule,
    SharedModule,
    MatCardModule,
    MatGridListModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    VisualizationsRoutingModule,
    VisualizationTypesDialogModule,
  ],
  declarations: [
    LibraryComponent,
    CreationComponent,
    VisualizationsComponent,
    VisualizationSaveDialogComponent,
  ],
})
export class VisualizationsModule {

}
