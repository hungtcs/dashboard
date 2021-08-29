import { tap } from 'rxjs';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Visualization, VisualizationsService } from '@webapp/routes/visualizations/shared/index';

export interface VisualizationDragStartEvent {
  event: DragEvent;
  visualization: Visualization;
}

@Component({
  selector: 'app-visualizations-pool',
  templateUrl: './visualizations-pool.component.html',
  styleUrls: ['./visualizations-pool.component.scss']
})
export class VisualizationsPoolComponent implements OnInit {
  public visualizations: Array<Visualization> = [];

  @Output()
  public visualizationDragStart = new EventEmitter<VisualizationDragStartEvent>();

  constructor(
      private readonly visualizationsService: VisualizationsService) {

  }

  public ngOnInit(): void {
    this.visualizationsService.getVisualizations()
      .pipe(tap(data => this.visualizations = data))
      .subscribe();
  }

  public onDragStart(event: DragEvent, visualization: Visualization) {
    this.visualizationDragStart.emit({ event, visualization });
  }

}
