import { Visualization } from '../interfaces';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { tap } from 'rxjs';

@Component({
  selector: 'app-visualization-render',
  styleUrls: ['./visualization-render.component.scss'],
  templateUrl: './visualization-render.component.html',
})
export class VisualizationRenderComponent implements OnInit, OnDestroy {
  private destroyCallbacks = new Array<() => void>();

  @Input()
  public visualization!: Visualization;

  @ViewChild('container', { static: true })
  public container!: ElementRef<HTMLElement>;

  constructor() {

  }

  public ngOnInit(): void {
    (window as any).getContanerElement = () => {
      return this.container.nativeElement;
    }
    (window as any).onDestroy = (callback: () => void) => {
      this.destroyCallbacks.push(callback);
    }
    const instance = new this.visualization.entrypoint(this.container.nativeElement);
    console.log(instance);
  }

  public ngOnDestroy() {
    // dsfds
    this.destroyCallbacks.forEach(callback => callback.call(null));
  }

  public onContainerResize() {
    // pass
  }

}
