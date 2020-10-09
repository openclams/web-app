import {JsonCloudProvider} from 'clams-ml';
import {JsonRegion} from 'clams-ml';

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
