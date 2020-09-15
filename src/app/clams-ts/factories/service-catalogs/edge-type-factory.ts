import JsonEdgeType from '../../schema/service-catalog/json-edge-type';
import EdgeType from '../../model/service-catalog/edge-type';
import AttributeFactory from './attribute-factory';


export default class EdgeTypeFactory {
    public static fromJSON(jsonEdgeType: JsonEdgeType): EdgeType {
        const edgeType = new EdgeType(jsonEdgeType.id, jsonEdgeType.name, [], [], []);
        if ('attributes' in jsonEdgeType) {
            edgeType.attributes = jsonEdgeType.attributes.map(attr => AttributeFactory.fromJSON(attr));
        }
        return edgeType;
    }
    public static toJSON(edgetype: EdgeType): JsonEdgeType {
        const jsonEdgeType = {
            id: edgetype.id,
            name: edgetype.name,
            attributes: [],
        } as JsonEdgeType;
        if (edgetype.attributes) {
            jsonEdgeType.attributes = edgetype.attributes.map(attr => AttributeFactory.toJSON(attr));
        }
        // ISSUE 10: we do not serialize allowd and exclude fields
        // Archtectual decision needs to be made later.
        // * How do we behave if the componentes do not exits anymore
        // * What are de implications for copy/past of an edge
        // if(this.allowed){
        //   jsonEdgeType['allowed'] = this.allowed.map(item => Object.assign({'from':item.from.id,'to':item.to.id},{}) );
        // }
        // if(this.exclude){
        //   jsonEdgeType['exclude'] = this.exclude.map(item => Object.assign({'from':item.from.id,'to':item.to.id},{}) );
        // }
        return jsonEdgeType;
    }
}
