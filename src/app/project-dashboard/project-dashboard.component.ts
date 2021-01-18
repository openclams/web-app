import { Component, OnInit, HostListener } from '@angular/core';
import { ProjectManager } from '../data-management/project-manager';
import JsonProjectMeta from '../model/json-project-meta';
import { MatDialog } from '@angular/material/dialog';
import { ProjectMetaDataDialogComponent } from './project-meta-data-dialog/project-meta-data-dialog.component';
import Project from '../model/project';
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
  }

  onDelete(project: JsonProjectMeta, idx: number) {
    ProjectManager.delete(project.id);
  }

  openProject(project: JsonProjectMeta){
    this.router.navigate(['project', project.id]);
  }

  openProjectDialog(metaData?: JsonProjectMeta) {
    console.log(metaData);
    const dialogRef = this.dialog.open(ProjectMetaDataDialogComponent,
      {data: {projectMeta: metaData}});

    dialogRef.afterClosed().subscribe((result: { isUpdate: boolean, data: Project }) => {
      if (!result || !result.data) {
        return;
      }
      console.log(`Dialog result:`, result);
      // Update/Save project
      if (result.isUpdate) {
        ProjectManager.load(metaData.id).then(project => {
          project.metaData = result.data.metaData;
          ProjectManager.save(project);
        });
      } else {
        ProjectManager.save(result.data);
      }
    });
  }

  getProjectMetas(): JsonProjectMeta[] {
    return ProjectManager.projectMetas;
  }

}
