import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorsRoutingModule } from './errors-routing.module';
import { InternalServerErrorComponent } from './internal-server-error/internal-server-error.component';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    InternalServerErrorComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    ErrorsRoutingModule
  ]
})
export class ErrorsModule { }
