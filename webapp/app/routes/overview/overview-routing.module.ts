import { NgModule } from '@angular/core';
import { OverviewComponent } from './overview.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      icon: 'dashboard',
      title: 'Dashboard',
    },
    component: OverviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OverviewRoutingModule { }
