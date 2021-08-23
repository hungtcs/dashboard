import { RouterOutlet } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {
  public icon?: string;
  public title: string = '';
  public sidenavOpened: boolean = false;

  @ViewChild('outlet', { static: true, read: RouterOutlet })
  public outlet!: RouterOutlet;


  constructor() {

  }

  public ngOnInit(): void {

  }

  public onRouterOutletActivate() {
    this.setTitle();
  }

  private setTitle() {
    if(this.outlet.isActivated) {
      const { title, icon } = this.outlet.activatedRoute.snapshot.data ?? {};
      icon && (this.icon = icon);
      title && (this.title = title);
    }
  }

}
