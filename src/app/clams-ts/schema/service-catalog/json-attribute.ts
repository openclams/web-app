/**
 * This interface defines the shape of an attribute when serialized to JSON.
 * ISSUE 5: imag should contain the binary of the image, not the URL, in order
 *          to make the project slef-containted.
 */
export default interface JsonAttribute {
  /**
   * For example 'name', 'description', 'comment',
   * 'cost', 'availability', 'etc'.
   */
  id: string;

  /**
   * The acctual attribute name shown as title.
   */
  name: string;

  /**
   * For example, 'number', 'text', 'Cost' (where the vlaue is a Cost object), and
   * 'enum' (where the value is a key value pair)
   */
  type: string;

  /**
   * The content of the attribute
   */
  value: any;

  /**
   * If true, the value cannot be changed, the attribute is a constant.
   * If false, the value can be modeifed by the user (constrained by the type).
   */
  readable?: boolean;

  /**
   * URL to the attribute's icon
   */
  img?: string;

  /**
   * Tooltip description of the attribute.
   */
  description?: string;
}
