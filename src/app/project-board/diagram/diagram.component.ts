import {Component, HostListener, OnInit} from '@angular/core';
import Settings from 'src/app/data-management/settings';
import {ProjectService} from 'src/app/project.service';
import {MatDialog} from '@angular/material';
import {CreateGraphDialogComponent} from '../graph-list/create-graph-dialog/create-graph-dialog.component';
import Graph from 'src/app/clams-ts/model/graphs/graph';
import SequenceDiagram from 'src/app/clams-ts/model/graphs/sequence-diagram/sequence-diagram';
import UserProfile from 'src/app/clams-ts/model/graphs/user-profile/user-profile';
import {GraphEventType} from 'src/app/events/graph-event-type';
import {GraphService} from 'src/app/graph.service';
import {ProjectManager} from 'src/app/data-management/project-manager';
import {Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.css']
})
export class DiagramComponent implements OnInit {

  drawerOpened: boolean;
  drawerTabIndex: number;

  constructor(public dialog: MatDialog,
              private projectService: ProjectService,
              private graphService: GraphService,
              private router: Router,
              private toastr: ToastrService,
              ) {
  }

  ngOnInit() {
    this.drawerOpened = false;
    this.drawerTabIndex = 0;
    this.getTab();
    Settings.get('leftSQDDrawerOpened', true, this.projectService.project).then(result => {
      this.drawerOpened = result;
    });
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    const screenHeight = window.innerHeight;
    const box2h = 64; // document.getElementById("command-bar").offsetHeight
    document.getElementById('main-container').style.height = (screenHeight - box2h) + 'px';
  }

  saveProject() {
    ProjectManager.save(this.projectService.project);
  }

  closeProject() {
    this.saveProject();
    this.router.navigate(['/']);
  }

  openCreateGraphDialog() {
    console.log('Create Graph Event');
    const dialogRef = this.dialog.open(CreateGraphDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      // Create Grpah;
      let graph: Graph = null;
      if (result.type === 0) {
        graph = new SequenceDiagram(this.projectService.project.model);
        this.toastr.info(`Created Sequence Diagram ${result.name}`);
      } else {
        this.toastr.info(`Created User Profile ${result.name}`);
        graph = new UserProfile(this.projectService.project.model);
      }
      graph.name = result.name;

      // Annonce that at new graph has been created
      this.graphService.triggerGraphEvent(GraphEventType.NEW, graph);
    });
  }

  openedChanged(event) {
    this.drawerOpened = event;
    Settings.set('leftSQDDrawerOpened', event, this.projectService.project);
  }

  setTab(index: number = -1) {
    // this.typeDrawer.close();
    if (index !== -1) {
      Settings.set('SideBarTab', index, this.projectService.project);
    }
  }

  getTab() {
    Settings.get('SideBarTab', 0, this.projectService.project).then(index => this.drawerTabIndex = index);
  }

  getFrame() {
    return this.projectService.getActiveFrame();
  }

  selectAll() {
    this.graphService.triggerGraphEvent(GraphEventType.SELECT_ALL, null);
  }

  deleteSelection() {
    this.graphService.triggerGraphEvent(GraphEventType.REMOVE_SELECTION, null);
  }

  undo() {

  }

  redo() {

  }
}
