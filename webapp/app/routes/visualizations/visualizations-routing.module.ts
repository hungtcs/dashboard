import { NgModule } from '@angular/core';
import { LibraryComponent } from './library/library.component';
import { CreationComponent } from './creation/creation.component';
import { RouterModule, Routes } from '@angular/router';
import { VisualizationsComponent } from './visualizations.component';

const routes: Routes = [
  {
    path: '',
    data: {
      icon: 'pie_chart',
      title: 'Visualizations',
    },
    children: [
      {
        path: '',
        component: LibraryComponent,
      },
      {
        path: 'create/:type',
        component: CreationComponent,
      },
    ],
    component: VisualizationsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisualizationsRoutingModule { }
