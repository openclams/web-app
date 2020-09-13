import { Component, ViewChild, HostListener } from '@angular/core';
import DataManagement from './data-management/data-managment';
import LocalStorageDriverPrinter from './data-management/drivers/local-storage-driver-printer';
import { SideNavService } from './side-nav.service';
import { MatDrawer } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OpenClams';

  @ViewChild('drawer', {static: false}) public sidenav: MatDrawer;

  constructor(private sideNavService: SideNavService) {
    DataManagement.setStorageDirver(new LocalStorageDriverPrinter());
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit(): void {
    console.log(this.sidenav);
    this.sideNavService.setSidenav(this.sidenav);
  }

}
