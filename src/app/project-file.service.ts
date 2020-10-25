import { Injectable } from '@angular/core';
import {ProjectService} from './project.service';
import {ProjectManager} from './data-management/project-manager';
import {saveAs} from 'file-saver';
import {ProjectFactory} from './data-management/project-factory';
import {JsonClamsProject} from "@openclams/clams-ml";
import JsonProject from "./model/json-project";
import {error} from "@angular/compiler/src/util";

@Injectable({
  providedIn: 'root'
})
export class ProjectFileService {

  private readonly FILE_SUFFIX = '.json';

  constructor(private projectService: ProjectService) { }

  async download(id: string = this.projectService.project.metaData.id) {
    const project = await ProjectManager.load(id)
    const projectJson = ProjectFactory.toJSON(project)
    saveAs(new Blob([JSON.stringify(projectJson)]), `${project.metaData.name}${this.FILE_SUFFIX}`)
  }

  upload(jsonProject: JsonProject) {
    ProjectManager.save(ProjectFactory.fromJSON(jsonProject))
  }

  async uploadAll(files: FileList): Promise<number> {
    let successCounter = 0;
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      try {
      this.upload(JSON.parse(await file.text()) as JsonProject);
      successCounter++;
      } catch (e) {
        error(`Could not read Project JSON from file: ${file.name}`)
      }
    }
    return successCounter
  }
}
