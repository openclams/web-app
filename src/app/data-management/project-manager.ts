import DataManagement from './data-management';
import Project from '../model/project';
import Settings from './settings';
import JsonProjectMeta from '../model/json-project-meta';
import JsonProject from '../model/json-project';
import {ProjectFactory} from './project-factory';

/**
 * Manage Projects
 */
export class ProjectManager {

  // currently available project metas
  static projectMetas: JsonProjectMeta[] = []

  /**
   * Load project information for dashboard
   */
  private static getProjectMetas(): Promise<JsonProjectMeta[]> {
    return DataManagement.storageDriver.get(DataManagement.KEY_PROJECT_DIRECTORY, []);
  }

  /**
   * Save project to storage
   *
   */
  public static async save(project: Project) {
    await Settings.get<JsonProjectMeta[]>(DataManagement.KEY_PROJECT_DIRECTORY, []).then(jsonProjectMetas => {
      const index = jsonProjectMetas.findIndex(p => p.id === project.metaData.id);
      if (index > -1) {
        jsonProjectMetas[index] = project.metaData;
      } else {
        jsonProjectMetas.push(project.metaData);
      }
      Settings.set<JsonProjectMeta[]>(DataManagement.KEY_PROJECT_DIRECTORY, jsonProjectMetas);
    });
    DataManagement.storageDriver.put(DataManagement.KEY_LAST_PROJECT_ID, project.metaData.id);
    DataManagement.storageDriver.put(project.metaData.id, ProjectFactory.toJSON(project));
    this.refreshProjectMetas()
  }

  /**
   * Load project from storage
   */
  public static load(id: string): Promise<Project> {
    return DataManagement.storageDriver.get<JsonProject>(id, null).then(
      jsonProject => {
        if (!jsonProject) {
          throw new Error('Project not found!');
        }
        DataManagement.storageDriver.put(DataManagement.KEY_LAST_PROJECT_ID, jsonProject.metaData.id);
        return ProjectFactory.fromJSON(jsonProject);
      },
      reason => {
        return null;
      });
  }

  /**
   * Remove project from storage
   *
   * Removes also all settings
   */
  public static delete(id: string) {
    // TODO: Remove all settings
    Settings.get<JsonProjectMeta[]>(DataManagement.KEY_PROJECT_DIRECTORY, []).then(jsonProjectMetas => {
      const index = jsonProjectMetas.findIndex(p => p.id === id);
      if (index > -1) {
        jsonProjectMetas.splice(index, 1);
      }
      Settings.set<JsonProjectMeta[]>(DataManagement.KEY_PROJECT_DIRECTORY, jsonProjectMetas);
    });
    DataManagement.storageDriver.delete(id);
    this.refreshProjectMetas()
  }

  /**
   * Close a project
   *
   * The project will be removed from last project cache.
   */
  public static close() {
    DataManagement.storageDriver.put(DataManagement.KEY_LAST_PROJECT_ID, null);
  }

  public static refreshProjectMetas() {
    ProjectManager.getProjectMetas().then(metas => {this.projectMetas = metas})
  }
}
