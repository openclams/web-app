
/**
 * Attribute class for components, edges, and templates.
 */
export default class Attribute {

  /**
   * id of the attribute
   */
  public id: string;

  /**
   * Title name
   */
  public name: string;

  /**
   * URL to attribute icon
   */
  public img: string;

  /**
   * Tooltip about the attribute
   */
  public description: string;

  /**
   * Attribute Types are:
   *  string
   *  number
   *  boolean
   *  enum
   *  cost
   */
  public type: string;

  /**
   * On enum: Record<string,string>
   * On cost: Cost class
   */
  public value: any;

  /**
   * If true, then the value cannot be changed.
   * If false, the user can change the value.
   */
  public readable: boolean;


  constructor(id: string) {
    this.id = id;
    this.value = null;
  }
}
