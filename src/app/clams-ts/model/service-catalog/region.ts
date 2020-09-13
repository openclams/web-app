import Service from './service';
import CloudProvider from './cloud-provider';

/**
 * Represenation of one cloud region.
 * Since some regions might offer differnt service,
 * we use a region also as a group.
 */
export default class Region {

  /**
   * Array of all services that belong to this region
   */
  public services: Service[];

  /**
   * Reference to the cloud provider of the region.
   */
  public cloudProvider: CloudProvider;
  /**
   * Create new region
   * @param id A unique region ID
   * @param name The region's name
   */
  constructor(public id: string,
            public name: string) {
    this.services = [];
    this.cloudProvider = null;
  }

}
