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
        path: 'visualizations',
        loadChildren: () => import('./visualizations/visualizations.module').then(module => module.VisualizationsModule),
      },
      {
        path: 'data-sources',
        loadChildren: () => import('./data-sources/data-sources.module').then(module => module.DataSourcesModule),
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
