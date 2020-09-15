import JsonModel from '../schema/json-model';
import Model from '../model/model';
import CloudProviderFactory from './service-catalogs/cloud-provider-factory';
import ComponentFactory from './service-catalogs/component-factory';
import ComponentWrapper from '../model/service-catalog/component-wrapper';
import GraphFactory from './graphs/graph-factory';


export default class ModelFactory {
    public static fromJSON(jsonModel: JsonModel): Model {
        const model = new Model();
        model.lastId = jsonModel.lastId;
        // Add cloud providers
        model.cloudProviders = jsonModel.cloudProviders.map(
            jsonProvider => CloudProviderFactory.fromJSON(jsonProvider));
        // Add components
        // Note: ComponentWrapper.instances are updated while loading the graphs
        model.components = jsonModel.components.map(jsonComponent =>
            new ComponentWrapper(ComponentFactory.fromJSON.call(model, jsonComponent)));
        // Add graphs
        model.graphs = jsonModel.graphs.map(jsonGraph => GraphFactory.fromJSON.call(model, jsonGraph));
        // Bind all states from user profiles to their sequence diagram.
        jsonModel.graphs.forEach(jsonGraph => GraphFactory.connectStates.call(model, jsonGraph));

        return model;
    }

    public static toJSON(model: Model): JsonModel {
        const jsonModel = {
            graphs : model.graphs.map(graph => GraphFactory.toJSON(graph)),
            cloudProviders : model.cloudProviders.map(provider => CloudProviderFactory.toJSON(provider)),
            components : model.components.map(cw => ComponentFactory.toJSON(cw.component)),
            lastId : model.lastId,
        };
        return jsonModel as JsonModel;
    }

    public static copy(model: Model): Model {
        const jsonModel = ModelFactory.toJSON(model);
        return ModelFactory.fromJSON(jsonModel);
    }
}
