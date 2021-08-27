import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataSourcesComponent } from './data-sources.component';

const routes: Routes = [
  {
    path: '',
    data: {
      icon: 'source',
      title: 'Data Source',
    },
    component: DataSourcesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataSourcesRoutingModule { }
