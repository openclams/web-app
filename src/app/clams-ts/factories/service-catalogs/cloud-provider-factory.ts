import CloudProvider from '../../model/service-catalog/cloud-provider';
import JsonCloudProvider from '../../schema/service-catalog/json-cloud-provider';
import RegionFactory from './region-factory';

export  default class CloudProviderFactory {
    public static fromJSON(jsonCloudProvider: JsonCloudProvider): CloudProvider {
        const cloudProvider = Object.assign(new CloudProvider(), jsonCloudProvider);
        cloudProvider.regions = jsonCloudProvider.regions.map( jsonRegion =>
            RegionFactory.fromJSON.call(cloudProvider, jsonRegion));
        return cloudProvider;
    }
    public static toJSON(cloudProvider: CloudProvider): JsonCloudProvider {
        const jsonCloudProvider: JsonCloudProvider = {
            target: cloudProvider.target,
            title: cloudProvider.title,
            company: cloudProvider.company,
            costLookupFile: cloudProvider.costLookupFile,
            basePath: cloudProvider.basePath,
            catalogFile: cloudProvider.catalogFile,
            image: cloudProvider.image,
            regions: cloudProvider.regions.map(region => RegionFactory.toJSON(region))
        };
        return jsonCloudProvider;
    }
}
