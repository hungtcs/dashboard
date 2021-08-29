import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutableModule } from './layoutable/layoutable.module';

@NgModule({
  imports: [
    CommonModule,
    LayoutableModule,
  ],
  exports: [
    LayoutableModule,
  ],
  declarations: [],
})
export class DashboardSharedModule {

}
