import Region from './region';
import Catalog from './catalog';

/**
 * A representation of a cloud provider
 */
export default  class CloudProvider {
  /**
   * Short name, e.g. 'aws', 'azure', etc...
   */
  public target: string;
  /**
   * Full name of the cloud, e.g. 'Amazone Web Services'
   */
  public title: string;
  /**
   * Company name, e.g. 'Amazon'
   */
  public company: string;
  /**
   * Path/URL to the service-catalogs.json
   */
  public basePath: string;
  /**
   * Path to the base folder of the cost lookup file.
   * Full path is basePath + costLookuuPath
   */
  public costLookupFile: string;
  /**
   * Name of the catalog fiel, e.g. service-catalog
   */
  public catalogFile: string;
  /**
   * Image URL to a logo of the cloud provider
   */
  public image: string;
  /**
   * Array of all available regions for this cloud provider in this project
   */
  public regions: Region[];
  /**
   * Reference to the service catalog of the cloud provider
   */
  public catalog: Catalog;

  constructor() {
    this.regions = [];
    this.catalog = null;
  }

}


