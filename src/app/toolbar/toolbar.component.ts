import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SideNavService } from '../side-nav.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private sideNavService: SideNavService) { }

  ngOnInit() {
  }

  toggleSideNavigation() {
    this.sideNavService.toggle();
 }
}
