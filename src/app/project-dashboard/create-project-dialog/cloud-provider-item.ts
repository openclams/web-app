import JsonCloudProvider from '../../clams-ts/json-model/service-catalog/json-cloud-provider';
import JsonRegion from '../../clams-ts/json-model/service-catalog/json-region';

export default class CloudProviderItem {
    public provider: JsonCloudProvider;
    public completed: boolean;
    public allCompleted: boolean;

    public options: {
        completed: boolean;
        region: JsonRegion;
    }[];

    constructor() {
        this.allCompleted = true;
        this.provider = null;
        this.options = [];
    }
}
