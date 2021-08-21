import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';

export type ColorMode = 'dark' | 'light';
export const COLOR_MODE_STORAGE_KEY = 'COLOR_MODE';

@Injectable({
  providedIn: 'root'
})
export class LookAndFeelService {
  public colorMode = new BehaviorSubject<ColorMode>('light');
  public currentBreakpoint = new BehaviorSubject<null | keyof typeof Breakpoints>(null);

  constructor(
      private readonly mediaMatcher: MediaMatcher,
      private readonly breakpointObserver: BreakpointObserver) {
    this.initColorMode();
    this.initCurrentBreakpoint();
  }

  private initColorMode() {
    let colorMode = window.localStorage.getItem(COLOR_MODE_STORAGE_KEY) as ColorMode | null;
    if(colorMode !== null) {
      colorMode = colorMode === 'dark' ? 'dark' : 'light';
      this.colorMode.next(colorMode);
      window.localStorage.setItem(COLOR_MODE_STORAGE_KEY, colorMode);
    } else {
      const mediaQueryList = this.mediaMatcher.matchMedia('(prefers-color-scheme: dark)');
      mediaQueryList.addEventListener(
        'change',
        event => {
          this.colorMode.next(event.matches ? 'dark' : 'light');
        },
      );
      this.colorMode.next(mediaQueryList.matches ? 'dark' : 'light');
    }
  }

  private initCurrentBreakpoint() {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ])
    .subscribe(result =>{
      if(result.matches) {
        const [query] = Object.entries(result.breakpoints).find(([_, value]) => value) ?? [null];
        const [breakpoint] = Object.entries(Breakpoints).find(([key, _query]) => _query === query) ?? [null];
        this.currentBreakpoint.next(breakpoint as keyof typeof Breakpoints);
      } else {
        this.currentBreakpoint.next(null);
      }
    });
  }

}
