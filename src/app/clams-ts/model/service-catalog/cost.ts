import Region from './region';

/**
 * A cost entry from the cost look up.
 * This class is used as the value of
 * an attribute when the type is 'cost'.
 */
export default  class Cost {

  /**
   * Create a new Cost entry.
   * @param region The cost according to the region
   * @param model The cost model, e.g., time-based or event based.
   * @param units The number of units
   * @param cost  Cost of an unit
   */
  constructor(public region: Region,
              public model: string,
              public units: number,
              public cost: number) {
  }
}
