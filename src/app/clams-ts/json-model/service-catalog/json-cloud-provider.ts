import JsonRegion from './json-region';

/**
 * This interface defines the shape of a cloud provider when serialized to JSON.
 */
export default interface JsonCloudProvider {
  /**
   * short name, e.g. 'aws'.
   * this target name is like the id
   * when components reference the cloud provider
   */
  target: string;

  /**
   * Full name of the cloud platform
   */
  title: string;

  /**
   * Company name
   */
  company: string;

  /**
   * relative file path to the cost look up table
   */
  costLookupFile: string;

  /**
   * base path of the service catalog
   */
  basePath: string;

  /**
   * relative file path to the service catalog
   */
  catalogFile: string;

  /**
   * relative image/logo of the cloud provider
   */
  image: string;

  /**
   * The available cloud regions
   */
  regions: JsonRegion[];
}
