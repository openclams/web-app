import JsonCost from './json-cost';

/**
 * This interface defines the shape of a cost table
 * when deserialized from JSON.
 */
export default interface JsonCostLookupTable {
  /**
   * 2D matrix with service id as rows and
   * region ids as columns. An entry defines
   * the particualr cost of a service in a region.
   */
  costTable: {
    /**
     * Reference to the service id
     */
    id: string;
    /**
     * Cost according to regions
     */
    regions:
      JsonCost[]
  }[];
}
