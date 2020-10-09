import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/project.service';
import {CloudProvider} from 'clams-ml';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  cloudProviders: CloudProvider[];

  constructor(public projectService: ProjectService) {
    this.cloudProviders = [];
  }

  ngOnInit() {
    this.cloudProviders = this.projectService.project.model.cloudProviders;
  }

}
