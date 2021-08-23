import { NgModule } from '@angular/core';
import { ChartsComponent } from './charts.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      icon: 'pie_chart',
      title: 'Charts',
    },
    component: ChartsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartsRoutingModule { }
