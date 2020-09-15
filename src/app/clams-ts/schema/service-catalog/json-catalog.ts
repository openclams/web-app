import JsonEdgeType from './json-edge-type';
import JsonCatalogComponent from './json-catalog-component';
import JsonCatalogTemplate from './json-catalog-template';

/**
 * This interface defines the shape of a service catalog when deserialized from JSON.
 */
export default interface JsonCatalog {
  /**
   * All possible edges types that can be used between componentes
   * in the sequence diagram
   */
  edges: JsonEdgeType[];
  /**
   * All available components
   */
  nodes: JsonCatalogComponent[];
  /**
   * All available templates
   */
  templates: JsonCatalogTemplate[];
}
