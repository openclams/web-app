import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {

  private sidenav: MatDrawer;

  constructor() { }

  public setSidenav(sidenav: MatDrawer) {
      this.sidenav = sidenav;
  }

  public open() {
      return this.sidenav.open();
  }


  public close() {
      return this.sidenav.close();
  }

  public toggle(): void {
    this.sidenav.toggle();
  }
}
