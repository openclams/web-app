import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectManager } from '../data-management/project-manager';
import Project from '../model/project';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.css']
})
export class ProjectBoardComponent implements OnInit {

  public project: Project;
  public projectNotFound: boolean;
  constructor(private route: ActivatedRoute, private projectService: ProjectService) {
    this.projectNotFound = false;
  }

  ngOnInit() {
    this.route.paramMap.subscribe( params => {
      const id = params.get('id');
      ProjectManager.load(id).then(project => {
        this.project = project;
        this.projectService.set(project);
      }).catch(res => {
        this.projectNotFound = true;
      });
    });
  }

}
