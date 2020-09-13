import JsonEdge from '../../json-model/graphs/json-edge';
import Edge from '../../model/graphs/edge';
import ArrowFactory from './arrow-factory';
import MessageFactory from './message-factory';
import Arrow from '../../model/graphs/user-profile/arrow';
import Message from '../../model/graphs/sequence-diagram/message';

export default class EdgeFactory {
    public static fromJSON(jsonEdge: JsonEdge): Edge {
        let edge: Edge = null;
        if (jsonEdge.type === 'Arrow') {
            edge = ArrowFactory.fromJSON.call(this, jsonEdge);
        } else {
            edge = MessageFactory.fromJSON.call(this, jsonEdge);
        }
        return edge;
    }
    public static toJSON(edge: Edge): JsonEdge {
        if (edge instanceof Arrow) {
            return ArrowFactory.toJSON(edge);
        } else if (edge instanceof Message) {
            return MessageFactory.toJSON(edge);
        }
        return null;
    }
}
