import JsonProject from '../json-model/json-project';
import Project from '../model/project';
import CloudProviderFactory from './service-catalogs/cloud-provider-factory';
import ComponentFactory from './service-catalogs/component-factory';
import ComponentWrapper from '../model/service-catalog/component-wrapper';
import GraphFactory from './graphs/graph-factory';


export default class ProjectFactory {
    public static fromJSON(jsonProject: JsonProject): Project {
        const project = new Project();
        project.lastId = jsonProject.lastId;
        // Add cloud providers
        project.cloudProviders = jsonProject.cloudProviders.map(
            jsonProvider => CloudProviderFactory.fromJSON(jsonProvider));
        // Add components
        // Note: ComponentWrapper.instances are updated while loading the graphs
        project.components = jsonProject.components.map(jsonComponent =>
            new ComponentWrapper(ComponentFactory.fromJSON.call(project, jsonComponent)));
        // Add graphs
        project.graphs = jsonProject.graphs.map(jsonGraph => GraphFactory.fromJSON.call(project, jsonGraph));
        // Bind all states from user profiles to their sequence diagram.
        jsonProject.graphs.forEach(jsonGraph => GraphFactory.connectStates.call(project, jsonGraph));

        return project;
    }

    public static toJSON(project: Project): JsonProject {
        const jsonProject = {
            graphs : project.graphs.map(graph => GraphFactory.toJSON(graph)),
            cloudProviders : project.cloudProviders.map(provider => CloudProviderFactory.toJSON(provider)),
            components : project.components.map(cw => ComponentFactory.toJSON(cw.component)),
            lastId : project.lastId,
        };
        return jsonProject as JsonProject;
    }

    public static copy(project: Project): Project {
        const jsonProject = ProjectFactory.toJSON(project);
        return ProjectFactory.fromJSON(jsonProject);
    }
}
