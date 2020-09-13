import JsonEdge from '../../json-model/graphs/json-edge';
import Arrow from '../../model/graphs/user-profile/arrow';
import UserProfile from '../../model/graphs/user-profile/user-profile';
import State from '../../model/graphs/user-profile/state';


export default class ArrowFactory {
    public static fromJSON(jsonEdge: JsonEdge): Arrow {
        const arrow = new Arrow(null, null);
        arrow.probability = jsonEdge.p;
        arrow.shape = jsonEdge.shape.corners;
        if (this instanceof UserProfile) {
            arrow.from = this.nodes.find(node => node.id === jsonEdge.from);
            arrow.to = this.nodes.find(node => node.id === jsonEdge.to);
            if (arrow.from instanceof State) {
                arrow.from.edgesOut.push(arrow);
            }
            if (arrow.to instanceof State) {
                arrow.to.edgesIn.push(arrow);
            }
        }
        return arrow;
    }
    public static toJSON(arrow: Arrow): JsonEdge {
        const jsonEdge = {
            'type': arrow.getType(),
            'from': arrow.from.id,
            'to': arrow.to.id,
        };
        jsonEdge['p'] = arrow.probability;
        jsonEdge['shape'] = { 'corners': arrow.shape };
        return jsonEdge;
    }
}
