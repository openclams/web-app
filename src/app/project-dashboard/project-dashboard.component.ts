import { Component, OnInit, HostListener } from '@angular/core';
import { ProjectManager } from '../data-management/project-manager';
import JsonProjectMeta from '../model/json-project-meta';
import { MatDialog } from '@angular/material/dialog';
import { CreateProjectDialogComponent } from './create-project-dialog/create-project-dialog.component';
import Project from '../model/project';
import { EditProjectDialogComponent } from './edit-project-dialog/edit-project-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.css']
})
export class ProjectDashboardComponent implements OnInit {


  constructor(public dialog: MatDialog, private router: Router) {
  }

  ngOnInit() {
    ProjectManager.refreshProjectMetas()
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    const screenHeight = window.innerHeight;
    let box2h = 64//document.getElementById("command-bar").offsetHeight
    document.getElementById("main-container").style.height = (screenHeight - box2h)+'px';
  }

  onDelete(project: JsonProjectMeta, idx: number) {
    ProjectManager.delete(project.id);
  }

  openProject(project: JsonProjectMeta){
    this.router.navigate(['project', project.id]);
  }

  openCreateProjectDialog() {
    console.log('Create Project Event');
    const dialogRef = this.dialog.open(CreateProjectDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      const project = result as Project;
      console.log(`Dialog result:`, project);
      // Save project
      ProjectManager.save(project);
    });
  }

  openEditDialog(metaData: JsonProjectMeta) {
    console.log('Create Project Event');
    const dialogRef = this.dialog.open(EditProjectDialogComponent,
      {data: {projectMeta: metaData}});

    dialogRef.afterClosed().subscribe(result => {
        if (!result) {
          return;
        }
        ProjectManager.load(metaData.id).then(project => {
          project.metaData = result;
          ProjectManager.save(project);
        });
    });
  }

  getProjectMetas(): JsonProjectMeta[] {
    return ProjectManager.projectMetas;
  }

}
