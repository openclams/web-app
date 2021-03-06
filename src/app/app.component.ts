import {Component, ViewChild, HostListener, AfterViewInit} from '@angular/core';
import DataManagement from './data-management/data-management';
import LocalStorageDriverPrinter from './data-management/drivers/local-storage-driver-printer';
import { SideNavService } from './side-nav.service';
import { MatDrawer } from '@angular/material';
import {ToastrService} from 'ngx-toastr';
import {GraphEventType} from './events/graph-event-type';
import {GraphKeyHandlerService} from './graph-key-handler.service';
import { ProjectService } from './project.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'OpenClams';

  @ViewChild('drawer', {static: false}) public sidenav: MatDrawer;

  constructor(private toastr: ToastrService, private sideNavService: SideNavService, private graphKeyHandler: GraphKeyHandlerService, private projectService: ProjectService) {
    DataManagement.setStorageDriver(new LocalStorageDriverPrinter());
  }

  ngAfterViewInit(): void {
    this.sideNavService.setSidenav(this.sidenav);
  }

  @HostListener('keyup.delete', ['$event'])
  keyUp(event: KeyboardEvent) {
    // bubble up event to all key handler services that are interested
    this.graphKeyHandler.onDelete(event);
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
   if(event.key === 'a'){
     if(this.projectService.project && this.projectService.project.model){
       const model = this.projectService.project.model;
       console.log(' ');
       console.log(model.components)
       for(const cw of model.components){
         console.log(cw.component.getAttribute('name').value + " has " + cw.instances.length + " instances.");
       }
     }
   }
  }
}
