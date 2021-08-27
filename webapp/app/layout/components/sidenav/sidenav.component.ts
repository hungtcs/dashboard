import { MatSidenav } from '@angular/material/sidenav';
import { Component, OnInit, Optional } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  public navItems: Array<any> = [
    {
      icon: 'dashboard',
      name: 'Dashboard',
      link: '/dashboard',
    },
    {
      icon: 'pie_chart',
      name: 'Charts',
      link: '/charts',
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

  public ngOnInit(): void {

  }

  public onNavItemClick() {
    if(this.sidenav && ['over', 'push'].includes(this.sidenav.mode)) {
      this.sidenav.close();
    }
  }

}
