import { APP_INITIALIZER, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { RoutesModule } from './routes/routes.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogConfig, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { ErrorInterceptor } from './shared/interceptors';
import { ExtensionsService } from './shared/services';
import { forkJoin } from 'rxjs';

@NgModule({
  imports: [
    RouterModule,
    RoutesModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      deps: [ExtensionsService],
      multi: true,
      provide: APP_INITIALIZER,
      useFactory: (extensionsService: ExtensionsService) => {
        return () => {
          return forkJoin([
            extensionsService.loadExtensions(),
          ]);
        };
      },
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: <MatDialogConfig>{
        ...new MatDialogConfig(),
        panelClass: 'responsive-dialog-pane',
      },
    },
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
    },
  ],
  bootstrap: [
    AppComponent,
  ],
  declarations: [
    AppComponent,
  ],
})
export class AppModule { }
