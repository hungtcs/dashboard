import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Visualization, VisualizationsService } from '@webapp/routes/visualizations/shared/index';
import { ExtensionsService } from '@webapp/shared/services';
import { tap } from 'rxjs';

@Component({
  selector: 'app-visualization-wrapper',
  styleUrls: ['./visualization-wrapper.component.scss'],
  templateUrl: './visualization-wrapper.component.html',
})
export class VisualizationWrapperComponent implements OnInit {

  @Input('visualization')
  public visualizationId!: string;

  @Input()
  public editing: boolean = false;

  @Output()
  public removeWidget = new EventEmitter<void>();

  public visualization: Visualization | null = null;

  constructor(
      private readonly extensionsService: ExtensionsService) {

  }

  public ngOnInit(): void {
    this.visualization = this.extensionsService.extensions.find(item => item.id === this.visualizationId);
    // this.visualizationsService.getVisualization(this.visualizationId)
    //   .pipe(tap(data => this.visualization = data))
    //   .subscribe();
  }

  public onRemoveWidgetClick() {
    this.removeWidget.emit();
  }

}
