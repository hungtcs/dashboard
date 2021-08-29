import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LayoutSharedModule } from '@webapp/layout/shared';
import { ObserversModule } from './observers/observers.module';

const MAT_MODULES = [
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatDialogModule,
  MatSidenavModule,
  MatTooltipModule,
  MatFormFieldModule,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ObserversModule,
    LayoutSharedModule,
    ...MAT_MODULES,
  ],
  exports: [
    CommonModule,
    RouterModule,
    ObserversModule,
    LayoutSharedModule,
    ...MAT_MODULES,
  ],
})
export class SharedModule {

}
