import { NgModule } from "@angular/core";
import { SharedModule } from "@webapp/shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { DataSourceCreationDialogComponent } from "./data-source-creation-dialog.component";

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DataSourceCreationDialogComponent,
  ],
})
export class DataSourceCreationDialogModule {

}
