import DataManagement from './data-managment';
import Project from '../model/project';
import Settings from './settings';
import JsonProjectMeta from '../model/json-project-meta';
import JsonProject from '../model/json-project';
import { ProjectFactory } from './project-factory';
/**
 * Manage Projects
 */
export class ProjectManager {

    /**
     * Load project information for dashborad
     */
    public static getProjectMetas(): Promise<JsonProjectMeta[]> {
        return DataManagement.storageDirver.get(DataManagement.KEY_PROJECT_DIRECTORY, []);
    }

    /**
     * Save project to storage
     *
     */
    public static save(project: Project) {
        Settings.get<JsonProjectMeta[]>(DataManagement.KEY_PROJECT_DIRECTORY, []).then(jsonProjectMetas => {
            const index = jsonProjectMetas.findIndex(p => p.id === project.metaData.id);
            if (index > -1) {
                jsonProjectMetas[index] = project.metaData;
            } else {
                jsonProjectMetas.push(project.metaData);
            }
            Settings.set<JsonProjectMeta[]>(DataManagement.KEY_PROJECT_DIRECTORY, jsonProjectMetas);
        });
        DataManagement.storageDirver.put(DataManagement.KEY_LAST_PROJECT_ID, project.metaData.id);
        DataManagement.storageDirver.put(project.metaData.id, ProjectFactory.toJSON(project));
    }

    /**
     * Load project from storage
     */
    public static load(id: string): Promise<Project> {
        return DataManagement.storageDirver.get<JsonProject>(id, null).then(
            jsonProject => {
                if (!jsonProject) {
                    throw new Error("Project not found!");
                }
                DataManagement.storageDirver.put(DataManagement.KEY_LAST_PROJECT_ID, jsonProject.metaData.id);
                const project = ProjectFactory.fromJSON(jsonProject);
                return project;
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
        DataManagement.storageDirver.delete(id);
    }

    /**
     * Close a project
     *
     * The poroject will be removed from last project cache.
     */
    public static close() {
        DataManagement.storageDirver.put(DataManagement.KEY_LAST_PROJECT_ID, null);
    }
}
