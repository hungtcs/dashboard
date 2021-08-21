import { Component, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { tap } from 'rxjs';
import { BreakpointKeys, LookAndFeelService } from 'webapp/app/shared/services';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {
  public sidenavMode: MatDrawerMode = 'push';
  public sidenavOpened: boolean = false;
  public currentBreakpoint: BreakpointKeys = null;

  constructor(
      private readonly lookAndFeelService: LookAndFeelService) {

  }

  public ngOnInit(): void {
    this.lookAndFeelService.currentBreakpoint
      .pipe(tap(breakpoint => this.currentBreakpoint = breakpoint))
      .pipe(tap(brrakpoint => {
        if(['XSmall', 'Small', null].includes(brrakpoint)) {
          this.sidenavMode = 'over';
        } else {
          this.sidenavMode = 'side';
        }
      }))
      .subscribe();
  }

}
