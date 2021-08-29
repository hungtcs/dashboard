import { RouterOutlet } from '@angular/router';
import { LayoutService } from '../shared/layout.service';
import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { tap } from 'rxjs';

@Component({
  selector: 'app-default-layout',
  styleUrls: ['./default-layout.component.scss'],
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnInit {
  public icon?: string;
  public title: string = '';
  public sidenavOpened: boolean = false;

  public headerTitle: null | TemplateRef<void> = null;
  public headerExtra: null | TemplateRef<void> = null;

  @ViewChild('outlet', { static: true, read: RouterOutlet })
  public outlet!: RouterOutlet;

  constructor(
      private readonly layoutService: LayoutService,
      private readonly changeDetectorRef: ChangeDetectorRef) {

  }

  public ngOnInit(): void {
    this.layoutService.headerTitle
      .pipe(tap(template => this.headerTitle = template))
      .pipe(tap(() => this.changeDetectorRef.detectChanges()))
      .subscribe();

    this.layoutService.headerExtra
      .pipe(tap(template => this.headerExtra = template))
      .pipe(tap(() => this.changeDetectorRef.detectChanges()))
      .subscribe();
  }

  public onRouterOutletActivate() {
    this.setTitle();
  }

  private setTitle() {
    if(this.outlet.isActivated) {
      const { title, icon } = this.outlet.activatedRoute.snapshot.data ?? {};
      icon && (this.icon = icon);
      title && (this.title = title);
    }
  }

}
