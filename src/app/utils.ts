import Project from './clams-ts/model/project';
import ProjectFactory from './clams-ts/factories/project-factory';

export default class Utils{

    public static undoBuffer: Project[] = [];
    public static redoBuffer: Project[] = [];

    public static removeItemFromArray(item: any, list: any[]){
        const index = list.indexOf(item, 0);
        if (index > -1) {
            list.splice(index, 1);
        }
    }

    public static saveSnapshot(project: Project) {
        Utils.undoBuffer.push(ProjectFactory.copy(project));
    }

    public static undoSnapshot() {
        const project = Utils.undoBuffer.pop();
        Utils.redoBuffer.push(project);
        return project;
    }

    public static redoSnapshot() {
        const project = Utils.redoBuffer.pop();
        Utils.undoBuffer.push(project);
        return project;
    }
}

