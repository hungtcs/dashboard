import { NgModule } from '@angular/core';
import { DataSourceCreationDialogModule } from './data-source-creation-dialog/data-source-creation-dialog.module';
import { DataSourcesSelectionDialogModule } from './data-sources-selection-dialog/data-sources-selection-dialog.module';

const PUBLIC_MODULES = [
  DataSourceCreationDialogModule,
  DataSourcesSelectionDialogModule,
];

@NgModule({
  imports: [
    ...PUBLIC_MODULES,
  ],
  exports: [
    ...PUBLIC_MODULES,
  ],
})
export class DataSourcesSharedModule {

}
