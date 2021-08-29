import { Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[observeResize]',
})
export class ResizeObserverDirective implements OnInit, OnDestroy {
  private observer: null | ResizeObserver = null;

  @Output('observeResize')
  public readonly observeResize = new EventEmitter<void>();

  constructor(
      private readonly elementRef: ElementRef<HTMLElement>) {

  }

  public ngOnInit() {
    this.observer = new ResizeObserver(() => this.observeResize.emit());
    this.observer.observe(this.elementRef.nativeElement);
  }

  public ngOnDestroy() {
    this.observer?.disconnect();
  }

}
