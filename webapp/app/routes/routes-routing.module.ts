import { NgModule } from '@angular/core';
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
        path: 'overview',
        loadChildren: () => import('./overview/overview.module').then(module => module.OverviewModule),
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboards/dashboards.module').then(module => module.DashboardsModule),
      },
      {
        path: 'visualizations',
        loadChildren: () => import('./visualizations/visualizations.module').then(module => module.VisualizationsModule),
      },
      {
        path: 'data-sources',
        loadChildren: () => import('./data-sources/data-sources.module').then(module => module.DataSourcesModule),
      },
    ],
  },
  {
    path: 'errors',
    loadChildren: () => import('./errors/errors.module').then(module => module.ErrorsModule),
  },
  {
    path: '**',
    redirectTo: 'errors/404',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class RoutesRoutingModule {

}
