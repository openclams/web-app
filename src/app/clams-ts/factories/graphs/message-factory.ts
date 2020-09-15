import JsonEdge from '../../schema/graphs/json-edge';
import Message from '../../model/graphs/sequence-diagram/message';
import EdgeTypeFactory from '../service-catalogs/edge-type-factory';
import SequenceDiagram from '../../model/graphs/sequence-diagram/sequence-diagram';
import Instance from '../../model/graphs/sequence-diagram/instance';
import Element from '../../model/graphs/sequence-diagram/Element';
import Template from '../../model/graphs/sequence-diagram/template';

export default class MessageFactory {
    public static fromJSON(jsonEdge: JsonEdge): Message {
        const message = new Message(null, null);
        message.position = jsonEdge.position;
        message.type = EdgeTypeFactory.fromJSON(jsonEdge.edgeType);
        if (this instanceof SequenceDiagram) {
            message.from = MessageFactory.findNode(jsonEdge.from, this.nodes as Element[]);
            message.to = MessageFactory.findNode(jsonEdge.to, this.nodes as Element[]);
            if (message.from instanceof Instance) {
                message.from.edgesOut.push(message);
            }
            if (message.to instanceof Instance) {
                message.to.edgesIn.push(message);
            }
        }
        return message;
    }

    public static findNode(nodeId: string , nodes: Element[]) {
        const node = nodes.find(n => n.id === nodeId);
        if (node) {
            return node;
        } else {
            for (const n of nodes) {
                if (n instanceof Template) {
                    return MessageFactory.findNode(nodeId, n.nodes);
                }
            }
            return null;
        }
    }

    public static toJSON(message: Message): JsonEdge {
        const jsonEdge = {
            type: message.getType(),
            from: message.from.id,
            to: message.to.id,
            position: message.position,
            edgeType: EdgeTypeFactory.toJSON(message.type)
        };
        return jsonEdge;
    }
}
