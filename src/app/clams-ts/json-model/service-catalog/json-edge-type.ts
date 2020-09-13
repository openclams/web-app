import JsonAttribute from './json-attribute';

/**
 * This interface defines the shape of an edge type when serialized to JSON
 * or read from the service catalog JSON.
 * Edge Types are only in combination with Messages
 */
export default interface JsonEdgeType {
  /**
   * Unique id, accross all service catalogs
   */
  id: string;

  /**
   * Name of the edge type, e.g. "HTTP Communication"
   */
  name: string;

  /**
   * Constraints to defeine which componentes can use this
   * edge type. This includes also child components.
   */
  allowed?:
  {
    /**
     * Component id
     */
    from: string;
    /**
     * Component id
     */
    to: string;
  }[];

   /**
   * Constraints to defeine which componentes cannot use this
   * edge type. This includes also child components.
   */
  exclude?:
  {
    /**
     * Component id
     */
    from: string;
    /**
     * Component id
     */
    to: string;
  }[];

  /**
   * Edges have the possibility of attributes
   */
  attributes?: JsonAttribute[];
}
