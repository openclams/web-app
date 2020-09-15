import JsonAttribute from '../../schema/service-catalog/json-attribute';
import Attribute from '../../model/service-catalog/attribute';
import CostFactory from './cost-factory';
import Cost from '../../model/service-catalog/cost';
import Component from '../../model/service-catalog/component';
import Region from '../../model/service-catalog/region';


export default class AttributeFactory {
    public static fromJSON(jsonAttribute: JsonAttribute): Attribute {
        const attribute = Object.assign(new Attribute(jsonAttribute.id), jsonAttribute);
        if (attribute.type === 'Cost') {
            attribute.value = CostFactory.fromJSON(jsonAttribute.value) as Cost;
            if (this instanceof Component) {
                // Bind the region of the cost to the region of the cloud provider
                const region: Region = attribute.value.region;
                attribute.value.region = this.cloudProvider.regions.find(r => r.id === region.id);
                if (!attribute.value.region) {
                    // If the cloud provider does not have the region, we go back to default
                    attribute.value.region = region;
                }
            }
        }
        return attribute;
    }
    public static toJSON(attribute: Attribute): JsonAttribute {
        const jsonAttribute = Object.assign({}, attribute) as JsonAttribute;
        if (attribute.type === 'Cost') {
            jsonAttribute.value = CostFactory.toJSON(attribute.value);
        }
        return jsonAttribute;
    }
}
