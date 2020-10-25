import { Injectable } from '@angular/core';
import {ProjectService} from './project.service';
import {ProjectManager} from './data-management/project-manager';
import {saveAs} from 'file-saver';
import {ProjectFactory} from './data-management/project-factory';

@Injectable({
  providedIn: 'root'
})
export class ProjectFileService {

  constructor(private projectService: ProjectService) { }

  async download(id: string = this.projectService.project.metaData.id) {
    const project = await ProjectManager.load(id)
    const projectJson = ProjectFactory.toJSON(project)
    saveAs(new Blob([JSON.stringify(projectJson)]), `${project.metaData.name}.json`)
  }
}
