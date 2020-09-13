import JsonRegion from './json-region';

/**
 * This interface defines the shape of a cost attribute
 * value when serialized to JSON.
 */
export default interface JsonCost {
  /**
   * Reference to the region
   */
  region: JsonRegion;

  /**
   * Cost model, e.g. event-based, time-based, fixed
   */
  model: string;

  /**
   * Number of units (is not present in the look up table)
   */
  units?: number;

  /**
   * Cost of a unit
   * ISSUE 8: implment a lookup table for different
   *          prices depending unit limits
   */
  cost: number;
}
