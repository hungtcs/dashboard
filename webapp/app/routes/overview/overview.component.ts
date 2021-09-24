import { Subject, tap } from 'rxjs';
import { VisualizationsService } from '@webapp/routes/visualizations/shared';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CompactType, DisplayGrid, GridsterComponent, GridsterConfig, GridsterItem, GridType } from 'angular-gridster2';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  private containerResize = new Subject<void>();

  @ViewChild('gridster', { read: GridsterComponent, static: true })
  public gridster!: GridsterComponent;

  public gridsterOptions: GridsterConfig = {
    setGridSize: true,
    disableWindowResize: true,

    gridType: GridType.VerticalFixed,
    displayGrid: DisplayGrid.None,
    // displayGrid: DisplayGrid.OnDragAndResize,
    compactType: CompactType.CompactUp,
    disableScrollHorizontal: true,

    pushItems: true,
    pushDirections: { north: false, east: false, south: true, west: false },

    minCols: 4,
    maxCols: 4,
    minRows: 1,
    fixedRowHeight: 300,

    minItemCols: 1,
    minItemRows: 1,
    maxItemCols: 4,
    maxItemRows: 2,
    margin: 16,

    // mobileBreakpoint: 959.98,

    // swap: true,
    draggable: {
      enabled: true,
      ignoreContent: false,
      // ignoreContentClass: 'gridstar-drag-ignore',
      // dragHandleClass: 'applet-wrapper-drag-handle',
    },
    resizable: {
      enabled: true,
    },

    keepFixedHeightInMobile: true,

    initCallback: () => {
      console.log('initCallback');
    },
    itemInitCallback: () => {
      // console.log('itemInitCallback', { item, itemComponent });
    },
    gridSizeChangedCallback: () => {
      // console.log('gridSizeChangedCallback', { curHeight: this.gridster.curHeight });
    },
  };

  public items: Array<GridsterItem> = [
    {
      x: 0,
      y: 0,
      cols: 1,
      rows: 1,
    },
    {
      x: 1,
      y: 0,
      cols: 3,
      rows: 1,
    },
    {
      x: 0,
      y: 1,
      cols: 3,
      rows: 1,
    },
    {
      x: 3,
      y: 1,
      cols: 1,
      rows: 1,
    },
  ];

  constructor(
      private readonly renderer: Renderer2,
      private readonly elementRef: ElementRef<HTMLElement>,
      private readonly visualizationsService: VisualizationsService) {

  }

  public ngOnInit(): void {
    const resizeObserver = new ResizeObserver(() => this.containerResize.next());
    resizeObserver.observe(this.elementRef.nativeElement);

    this.containerResize
      // .pipe(debounceTime(128))
      .pipe(tap(() => {
        window.requestAnimationFrame(() => {
          // keep scrollbar visible when resize grid
          this.renderer.setStyle(this.elementRef.nativeElement, 'height', `${ this.elementRef.nativeElement.clientHeight }px`);
          this.gridster.options.api?.resize?.();
          this.renderer.setStyle(this.elementRef.nativeElement, 'height', `auto`);
        });
      }))
      .subscribe();


    this.visualizationsService.getVisualizations()
      .pipe(tap(a => console.log(a)))
      .subscribe();
  }

}
