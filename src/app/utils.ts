import {Model} from 'clams-ml';
import {ModelFactory} from 'clams-ml';

export default class Utils{

    public static undoBuffer: Model[] = [];
    public static redoBuffer: Model[] = [];

    public static removeItemFromArray(item: any, list: any[]){
        const index = list.indexOf(item, 0);
        if (index > -1) {
            list.splice(index, 1);
        }
    }

    public static saveSnapshot(project: Model) {
        Utils.undoBuffer.push(ModelFactory.copy(project));
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

