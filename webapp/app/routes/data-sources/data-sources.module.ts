import { NgModule } from '@angular/core';
import { SharedModule } from '@webapp/shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { DataSourcesComponent } from './data-sources.component';
import { DataSourcesSharedModule } from './shared/shared.module';
import { DataSourcesRoutingModule } from './data-sources-routing.module';

@NgModule({
  imports: [
    SharedModule,
    MatCardModule,
    MatTableModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    DataSourcesSharedModule,
    DataSourcesRoutingModule,
  ],
  declarations: [
    DataSourcesComponent,
  ],
})
export class DataSourcesModule { }
