import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@webapp/layout/index';
import { RoutesRoutingModule } from './routes-routing.module';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    RoutesRoutingModule,
  ],
})
export class RoutesModule {

}
