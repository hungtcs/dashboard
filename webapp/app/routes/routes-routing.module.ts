import { NgModule } from '@angular/core';
import { LayoutModule } from '../layout/layout.module';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from '../layout/default-layout/default-layout.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./overview/overview.module').then(module => module.OverviewModule),
      },
      {
        path: 'charts',
        loadChildren: () => import('./charts/charts.module').then(module => module.ChartsModule),
      },
    ],
  },
];

@NgModule({
  imports: [
    LayoutModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class RoutesRoutingModule {

}
