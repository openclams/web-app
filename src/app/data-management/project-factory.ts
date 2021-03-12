import JsonProject from '../model/json-project';
import Project from '../model/project';
import { ModelFactory } from '@openclams/clams-ml';
import { FrameFactory } from './frame-factory';


export class ProjectFactory {
    public static fromJSON(jsonProject: JsonProject): Project {
        const project = new Project();

        project.metaData = Object.assign({}, jsonProject.metaData);
        project.model = ModelFactory.fromJSON(jsonProject.model);
        project.frames = jsonProject.frames.map(jsonFrame => FrameFactory.fromJSON.call(project, jsonFrame));
        return project;
    }

    public static toJSON(project: Project): JsonProject {
        const jsonProject = {
            metaData: project.metaData,
            frames:  project.frames.map(frame => FrameFactory.toJSON(frame)),
            model: ModelFactory.toJSON(project.model)
        };
        return jsonProject;
    }

    public static copy(project: Project): Project {
        const jsonProject = ProjectFactory.toJSON(project);
        return ProjectFactory.fromJSON(jsonProject);
    }
}
