import JsonCost from '../../schema/service-catalog/json-cost';
import Cost from '../../model/service-catalog/cost';
import RegionFactory from './region-factory';

export default class CostFactory {
    public static fromJSON(jsonCost: JsonCost): Cost {
        const cost = new Cost(RegionFactory.fromJSON(jsonCost.region),
                                                    jsonCost.model,
                                                    jsonCost.units,
                                                    jsonCost.cost);
        return cost;
    }
    public static toJSON(cost: Cost): JsonCost {
        return {
            region: RegionFactory.toJSON(cost.region),
            model: cost.model,
            units: cost.units,
            cost: cost.cost
        };
    }
}
