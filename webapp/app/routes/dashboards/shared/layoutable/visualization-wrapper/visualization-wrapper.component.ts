import { Component, Input, OnInit } from '@angular/core';
import { Visualization, VisualizationsService } from '@webapp/routes/visualizations/shared/index';
import { tap } from 'rxjs';

@Component({
  selector: 'app-visualization-wrapper',
  styleUrls: ['./visualization-wrapper.component.scss'],
  templateUrl: './visualization-wrapper.component.html',
})
export class VisualizationWrapperComponent implements OnInit {

  @Input('visualization')
  public visualizationId!: string;

  public visualization: Visualization | null = null;

  constructor(
      private readonly visualizationsService: VisualizationsService) {

  }

  public ngOnInit(): void {
    this.visualizationsService.getVisualization(this.visualizationId)
      .pipe(tap(data => this.visualization = data))
      .subscribe();
  }

}
