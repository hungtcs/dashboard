import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderExtraDirective } from './header-extra.directive';
import { HeaderTitleDirective } from './header-title.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    HeaderTitleDirective,
    HeaderExtraDirective,
  ],
  declarations: [
    HeaderTitleDirective,
    HeaderExtraDirective,
  ],
})
export class LayoutSharedModule {

}
