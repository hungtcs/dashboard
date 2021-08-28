import { NgModule } from '@angular/core';
import { SharedModule } from '@webapp/shared/shared.module';
import { DataSourcesSelectionDialogComponent } from './data-sources-selection-dialog.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    DataSourcesSelectionDialogComponent
  ],
})
export class DataSourcesSelectionDialogModule {

}
