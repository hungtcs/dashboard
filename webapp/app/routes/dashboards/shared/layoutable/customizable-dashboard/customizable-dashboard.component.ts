import { debounceTime, filter, finalize, Subject, takeUntil, tap } from 'rxjs';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { GridsterConfig, GridType, DisplayGrid, CompactType, GridsterItem, GridsterComponent } from 'angular-gridster2';

@Component({
  exportAs: 'appCustomizableDashboard',
  selector: 'app-customizable-dashboard',
  styleUrls: ['./customizable-dashboard.component.scss'],
  templateUrl: './customizable-dashboard.component.html',
})
export class CustomizableDashboardComponent implements OnInit, OnDestroy {
  public static DROP_VALIDATION_STRING = 'CUSTOMIZABLE_DASHBOARD_DROP_VALIDATION_STRING';

  private readonly destroy = new Subject<void>();
  private readonly containerResize = new Subject<void>();
  private readonly itemChangedSubject = new Subject<void>();

  public editing: boolean = false;

  @ViewChild('gridster', { read: GridsterComponent, static: true })
  public gridster!: GridsterComponent;

  public gridsterOptions: GridsterConfig;

  @Input()
  public widgets: Array<GridsterItem> = [];

  @Output()
  public widgetsChange = new EventEmitter<Array<GridsterItem>>();

  constructor(
      private readonly renderer: Renderer2,
      private readonly elementRef: ElementRef<HTMLElement>) {
    this.gridsterItemChangeCallback = this.gridsterItemChangeCallback.bind(this);
    this.gridsterEmptyCellDropCallback = this.gridsterEmptyCellDropCallback.bind(this);
    this.gridsterOptions = {
      setGridSize: true,
      disableWindowResize: true,

      gridType: GridType.VerticalFixed,
      displayGrid: DisplayGrid.None,
      // displayGrid: DisplayGrid.OnDragAndResize,
      compactType: CompactType.CompactUp,
      disableScrollHorizontal: true,

      enableEmptyCellDrop: true,
      emptyCellDropCallback: this.gridsterEmptyCellDropCallback,

      pushItems: true,
      pushDirections: { north: false, east: true, south: true, west: false },

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
        enabled: false,
        ignoreContent: false,
        // ignoreContentClass: 'gridstar-drag-ignore',
        // dragHandleClass: 'applet-wrapper-drag-handle',
      },
      resizable: {
        enabled: false,
      },

      keepFixedHeightInMobile: true,

      initCallback: () => {
        console.log('initCallback');
      },
      itemInitCallback: () => {
        // console.log('itemInitCallback', { item, itemComponent });
      },
      itemChangeCallback: this.gridsterItemChangeCallback,
      gridSizeChangedCallback: () => {
        // console.log('gridSizeChangedCallback', { curHeight: this.gridster.curHeight });
      },
    };
  }

  public ngOnInit(): void {
    const resizeObserver = new ResizeObserver(() => this.containerResize.next());
    resizeObserver.observe(this.elementRef.nativeElement);
    this.containerResize
      .pipe(takeUntil(this.destroy))
      .pipe(finalize(() => resizeObserver.disconnect()))
      .pipe(tap(() => {
        window.requestAnimationFrame(() => {
          // keep scrollbar visible when resize grid
          this.renderer.setStyle(this.elementRef.nativeElement, 'height', `${ this.elementRef.nativeElement.clientHeight }px`);
          this.gridster.options.api?.resize?.();
          this.renderer.setStyle(this.elementRef.nativeElement, 'height', `auto`);
        });
      }))
      .subscribe();
    this.itemChangedSubject
      .pipe(takeUntil(this.destroy))
      .pipe(filter(() => this.editing))
      .pipe(debounceTime(128))
      .pipe(tap(() => {
        // expansion and reduction gridster min rows
        this.gridster.options.minRows = 1;
        this.gridster.options.api?.optionsChanged?.();
        this.gridster.options.minRows = this.gridster.rows + 1;
        this.gridster.options.api?.optionsChanged?.();
      }))
      .subscribe();
  }

  public ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  public onRemoveWidget(widget: GridsterItem) {
    this.widgets = this.widgets.filter(item => item !== widget);
    this.widgetsChange.emit(this.widgets);
  }

  public startEditing() {
    this.editing = true;

    this.gridster.options.mobileBreakpoint = 0;
    this.gridster.options.resizable!.enabled = true;
    this.gridster.options.draggable!.enabled = true;
    this.gridster.options.minRows = this.gridster.rows + 1;
    this.gridster.options.api?.optionsChanged?.();
  }

  public stopEditing() {
    this.editing = false;

    this.gridster.options.resizable!.enabled = false;
    this.gridster.options.draggable!.enabled = false;
    this.gridster.options.minRows = this.gridster.rows - 1;
    this.gridster.options.api?.optionsChanged?.();
  }

  public cancelEditing() {
    this.stopEditing();
  }

  private gridsterItemChangeCallback() {
    this.itemChangedSubject.next();
  }

  private gridsterEmptyCellDropCallback(event: DragEvent, item: GridsterItem) {
    if (event.dataTransfer) {
      const text = event.dataTransfer.getData('text/plain');
      try {
        const data = JSON.parse(text);
        if (data && data.validation && data.validation === CustomizableDashboardComponent.DROP_VALIDATION_STRING) {
          this.widgets.push({
            ...item,
            visualization: data.visualization,
            extension: data.visualization,
          });
        } else {
          throw new Error(text);
        }
      } catch (err) {
        console.warn(`Invalid Drop Object: `, err);
        this.gridster.movingItem = null;
        this.gridster.previewStyle();
      }
    }
  }

}
