import { Subject } from 'rxjs';
import { LayoutService } from './layout.service';
import { Directive, OnDestroy, OnInit, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appHeaderTitle]'
})
export class HeaderTitleDirective implements OnInit, OnDestroy {
  private destroy = new Subject<void>();

  constructor(
      private readonly templateRef: TemplateRef<void>,
      private readonly layoutService: LayoutService) {
  }

  public ngOnInit() {
    this.layoutService.useTemplate(
      'header-title',
      this.templateRef,
      this.destroy,
    );
  }

  public ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

}
