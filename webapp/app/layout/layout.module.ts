import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
  ],
  exports: [
    DefaultLayoutComponent,
  ],
  declarations: [
    DefaultLayoutComponent,
    SidenavComponent,
  ],
})
export class LayoutModule {

}
