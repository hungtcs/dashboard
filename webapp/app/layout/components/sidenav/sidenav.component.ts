import { MatSidenav } from '@angular/material/sidenav';
import { Component, OnInit, Optional } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  public navItems = [
    {
      icon: 'dashboard',
      name: 'Dashboard',
      link: '/dashboard',
      exact: true,
    },
    {
      icon: 'pie_chart',
      name: 'Charts',
      link: '/charts',
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
