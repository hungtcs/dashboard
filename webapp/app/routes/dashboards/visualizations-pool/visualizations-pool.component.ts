import { Subject } from 'rxjs';
import { ExtensionsService } from '@webapp/shared/services';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

export interface VisualizationDragStartEvent {
  event: DragEvent;
  extension: any;
}

@Component({
  selector: 'app-visualizations-pool',
  templateUrl: './visualizations-pool.component.html',
  styleUrls: ['./visualizations-pool.component.scss']
})
export class VisualizationsPoolComponent implements OnInit, OnDestroy {
  private readonly destroy = new Subject<void>();

  public statelessExtensions: Array<any> = [];

  @Output()
  public visualizationDragStart = new EventEmitter<VisualizationDragStartEvent>();

  constructor(
      private readonly extensionsService: ExtensionsService) {

  }

  public ngOnInit(): void {
    this.statelessExtensions = this.extensionsService.extensions
      .filter(extension => extension.nature === 'stateless');
    // this.visualizationsService.getVisualizations()
    //   .pipe(takeUntil(this.destroy))
    //   .pipe(tap(data => this.visualizations = data))
    //   .subscribe();
  }

  public ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  public onDragStart(event: DragEvent, extension: any) {
    this.visualizationDragStart.emit({ event, extension });
  }

}
