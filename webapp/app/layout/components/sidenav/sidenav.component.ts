import { MatSidenav } from '@angular/material/sidenav';
import { Component, Optional } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  public navItems: Array<any> = [
    {
      icon: 'dashboard',
      name: 'Dashboard',
      link: '/dashboard',
    },
    {
      icon: 'pie_chart',
      name: 'Visualizations',
      link: '/visualizations',
    },
    {
      icon: 'source',
      name: 'Data Sources',
      link: '/data-sources',
    },
  ];

  constructor(
      @Optional() private readonly sidenav: MatSidenav) {

  }

  public onNavItemClick() {
    if (this.sidenav && ['over', 'push'].includes(this.sidenav.mode)) {
      this.sidenav.close();
    }
  }

}
