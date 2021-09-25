import { Subject, takeUntil, tap } from 'rxjs';
import { VisualizationDragStartEvent } from './visualizations-pool/visualizations-pool.component';
import { Dashboard, DashboardsService } from './shared/index';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CustomizableDashboardComponent } from './shared/layoutable/customizable-dashboard/customizable-dashboard.component';

@Component({
  selector: 'app-dashboards',
  styleUrls: ['./dashboards.component.scss'],
  templateUrl: './dashboards.component.html',
})
export class DashboardsComponent implements OnInit, OnDestroy {
  private readonly destroy = new Subject<void>();
  public dashboards: Array<Dashboard> = [];
  public currentDashboard: Dashboard | null = null;

  public widgets: Array<any> = [];

  @ViewChild('customizableDashboard', { static: true, read: CustomizableDashboardComponent })
  public customizableDashboard!: CustomizableDashboardComponent;

  public get currentDashboardEditing() {
    return this.customizableDashboard.editing;
  }

  constructor(
      private readonly dashboardsService: DashboardsService) {

  }

  public ngOnInit(): void {
    this.dashboardsService.getDashboards()
      .pipe(takeUntil(this.destroy))
      .pipe(tap(data => this.dashboards = data))
      .pipe(tap(data => this.setCurrentDashboard(data[0])))
      .subscribe();
  }

  public ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  public onVisualizationDragStart({ event, visualization }: VisualizationDragStartEvent) {
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', JSON.stringify({
        validation: CustomizableDashboardComponent.DROP_VALIDATION_STRING,
        visualization: visualization.id,
      }));
      event.dataTransfer.dropEffect = 'copy';
    }
  }

  public onSaveDashboard() {
    this.customizableDashboard.stopEditing();
    this.dashboardsService.setDashboardWidgets(this.currentDashboard!.id, this.customizableDashboard.widgets)
      .subscribe();
  }

  public setCurrentDashboard(dashboard: Dashboard) {
    this.currentDashboard = dashboard;
    this.dashboardsService.getDashboardWidgets(this.currentDashboard.id)
      .pipe(tap(data => this.widgets = data))
      .subscribe();
  }

}
