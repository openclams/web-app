import { Component, OnInit } from '@angular/core';
import { SideNavService } from '../side-nav.service';

@Component({
  selector: 'app-command-bar',
  templateUrl: './command-bar.component.html',
  styleUrls: ['./command-bar.component.css']
})
export class CommandBarComponent implements OnInit {

  constructor(private sideNavService: SideNavService) { }

  ngOnInit() {
  }

  toggleSideNavigation() {
    this.sideNavService.toggle();
 }

}
