import JsonRegion from '../../schema/service-catalog/json-region';
import Region from '../../model/service-catalog/region';
import CloudProvider from '../../model/service-catalog/cloud-provider';

export default class RegionFactory {

    public static fromJSON(jsonRegion: JsonRegion): Region {
        const region = new Region(jsonRegion.id, jsonRegion.name);
        if ( this instanceof CloudProvider ) {
            region.cloudProvider = this;
        }
        return region;
    }

    public static toJSON(region: Region): JsonRegion {
        return {
            id: region.id,
            name: region.name
        };
    }
}
