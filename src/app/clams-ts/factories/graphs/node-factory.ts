import JsonNode from '../../schema/graphs/json-node';
import Dot from '../../model/graphs/user-profile/dot';
import State from '../../model/graphs/user-profile/state';
import Template from '../../model/graphs/sequence-diagram/template';
import Instance from '../../model/graphs/sequence-diagram/instance';
import GeometryFactory from './geometry-factory';
import Graph from '../../model/graphs/graph';
import Node from '../../model/graphs/node';
import UserProfile from '../../model/graphs/user-profile/user-profile';
import SequenceDiagram from '../../model/graphs/sequence-diagram/sequence-diagram';


export default class NodeFactory {
    public static fromJSON(jsonNode: JsonNode): Node {
        if (jsonNode.type === 'Dot') {
            return DotFactory.fromJSON.call(this, jsonNode);
        } else if (jsonNode.type === 'State') {
            return StateFactory.fromJSON.call(this, jsonNode);
        } else if (jsonNode.type === 'Template') {
            return TemplateFactory.fromJSON.call(this, jsonNode);
        } else if (jsonNode.type === 'Instance') {
            return InstanceFactory.fromJSON.call(this, jsonNode);
        }
        return null;
    }
    public static toJSON(node: Node): JsonNode {
        if (node instanceof Dot) {
            return DotFactory.toJSON(node);
        } else if (node instanceof State) {
            return StateFactory.toJSON(node);
        } else if (node instanceof Template) {
            return TemplateFactory.toJSON(node);
        } else if (node instanceof Instance) {
            return InstanceFactory.toJSON(node);
        }
        return null;
    }
}

export class DotFactory {
    public static fromJSON(jsonNode: JsonNode): Dot {
        const dot = new Dot(null);
        dot.id = jsonNode.id;
        if (this instanceof UserProfile) {
            dot.graph = this;
        }
        dot.geometry = GeometryFactory.fromJSON(jsonNode.geometry);
        return dot;
    }
    public static toJSON(dot: Dot): JsonNode {
        return {
            type: dot.getType(),
            id: dot.id,
            geometry: GeometryFactory.toJSON(dot.geometry)
        };
    }
}

export class StateFactory {
    public static fromJSON(jsonState: JsonNode): State {
        const state = new State(null, null);
        state.id = jsonState.id;
        if (this instanceof UserProfile) {
            state.graph = this;
        }
        state.geometry = GeometryFactory.fromJSON(jsonState.geometry);
        return state;
    }
    public static toJSON(state: State): JsonNode {
        return {
            id: state.id,
            type: state.getType(),
            graph: state.graph.id,
            geometry: GeometryFactory.toJSON(state.geometry)
        };
    }
}

export class TemplateFactory {
    public static fromJSON(jsonInstance: JsonNode): Template {
        const template = new Template(null, null);
        template.id = jsonInstance.id;
        template.geometry = GeometryFactory.fromJSON(jsonInstance.geometry);
        if (this instanceof Graph) {
            template.graph = this;

            const componentWrapper = this.model.components.find(c => c.component.id === jsonInstance.component);
            template.componentWrapper = componentWrapper;

            template.nodes = jsonInstance.nodes.map(jsonNode => NodeFactory.fromJSON.call(this, jsonNode));
            template.nodes.forEach(node => node.parent = template);
        }
        return template;
    }
    public static toJSON(template: Template): JsonNode {
        return {
            type: template.getType(),
            id: template.id,
            geometry: GeometryFactory.toJSON(template.geometry),
            component: template.component.id,
            nodes: template.nodes.map(node => NodeFactory.toJSON(node))
        };
    }
}

export class InstanceFactory {
    public static fromJSON(jsonInstance: JsonNode): Instance {
        const instance = new Instance(null, null);
        instance.id = jsonInstance.id;
        instance.geometry = GeometryFactory.fromJSON(jsonInstance.geometry);
        if (this instanceof Graph) {
            instance.graph = this;
            const name = jsonInstance.component;
            const componentWrapper = this.model.components.find(c => c.component.getAttribute('name').value === name);
            instance.componentWrapper = componentWrapper;
            componentWrapper.instances.push(instance);
        }
        return instance;
    }
    public static toJSON(instance: Instance): JsonNode {
        return {
            type: instance.getType(),
            id: instance.id,
            geometry: GeometryFactory.toJSON(instance.geometry),
            component: instance.component.getAttribute('name').value
        };
    }
}
