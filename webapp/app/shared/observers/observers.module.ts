import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResizeObserverDirective } from './resize-observer.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    ResizeObserverDirective,
  ],
  declarations: [
    ResizeObserverDirective,
  ],
})
export class ObserversModule {

}
