import JsonComponent from '../../schema/graphs/json-component';
import Component from '../../model/service-catalog/component';
import Pattern from '../../model/service-catalog/pattern';
import Service from '../../model/service-catalog/service';
import TemplateType from '../../model/service-catalog/template';
import AttributeFactory from './attribute-factory';
import Model from '../../model/model';
import RegionFactory from './region-factory';
import CloudProvider from '../../model/service-catalog/cloud-provider';


export default class ComponentFactory {
    public static fromJSON(jsonComponent: JsonComponent): Component {
        const attributes =  jsonComponent.attributes.map(a => AttributeFactory.fromJSON(a));

        let cloudProvider: CloudProvider = null;
        if (this instanceof Model) {
            cloudProvider = this.cloudProviders.find(p => p.target === jsonComponent.targetCloud);
        }

        let component = null;
        if (jsonComponent.type === 'Pattern') {
            component = new Pattern(jsonComponent.id, jsonComponent.name,  jsonComponent.img, attributes, cloudProvider);
        } else if (jsonComponent.type === 'Service') {
            component = new Service(jsonComponent.id, jsonComponent.name,  jsonComponent.img, attributes, cloudProvider);
            const service = component as Service;
            if ( jsonComponent.regions && cloudProvider) {
                service.regions = cloudProvider.regions.filter(r => jsonComponent.regions.find(rr => rr.id === r.id));
                service.regions.forEach(region => region.services.push(service));
            } else if (jsonComponent.regions) {
                service.regions = jsonComponent.regions.map(jsonRegions => RegionFactory.fromJSON(jsonRegions));
            }
        } else {
            component = new TemplateType(jsonComponent.id, jsonComponent.name,  jsonComponent.img, attributes, cloudProvider);
            component.components = jsonComponent.components.map(josnComponent => ComponentFactory.fromJSON.call(this, josnComponent));
        }

        return component;
    }
    public static toJSON(component: Component): JsonComponent {
        const jsonComponent = {
            type: component.getType(),
            id: component.id,
            name: component.name,
            img: component.img,
            attributes: component.attributes.map(a => AttributeFactory.toJSON(a)),
            targetCloud: component.cloudProvider.target,
            components: null,
            regions: null
        };
        if (component instanceof TemplateType) {
            jsonComponent.components = component.components.map(c => ComponentFactory.toJSON(c));
        }
        if (component instanceof Service) {
            jsonComponent.regions = component.regions.map(r => RegionFactory.toJSON(r));
        }
        return jsonComponent;
    }

    public static copy(component: Component, model?: Model): Component {
        const jsonComponent = ComponentFactory.toJSON(component);
        return ComponentFactory.fromJSON.call(model, jsonComponent);
    }
}
