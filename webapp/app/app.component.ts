import 'systemjs';
import { tap } from 'rxjs';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { paramCase } from 'change-case';
import { Component, OnInit } from '@angular/core';
import { LookAndFeelService } from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
      private readonly lookAndFeelService: LookAndFeelService,
      @Inject(DOCUMENT) private readonly document: Document) {

  }

  public ngOnInit() {
    this.lookAndFeelService.colorMode
      .pipe(tap(colorMode => {
        this.document.documentElement.setAttribute('data-color-mode', colorMode);
      }))
      .subscribe();
    this.lookAndFeelService.currentBreakpoint
      .pipe(tap(breakpoint => {
        if(breakpoint !== null) {
          this.document.documentElement.setAttribute('data-viewport', paramCase(breakpoint));
        } else {
          this.document.documentElement.removeAttribute('data-viewport');
        }
      }))
      .subscribe();

    (async function() {
      const response = await fetch(`/api/extensions`);
      const extensions: Array<any> = await response.json();

      extensions.forEach(extension => {
        System.import(`/api/extensions/${ extension.id }/entrypoint`)
          .then(extension => {
            const Class = extension.default;
            new Class();
          });
      });

    }());
  }

}
