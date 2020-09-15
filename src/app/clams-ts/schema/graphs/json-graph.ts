import JsonNode from './json-node';
import JsonEdge from './json-edge';

/**
 * This interface defines the shape of a graph when serialized to JSON.
 */
export default interface JsonGraph {
    /**
     * Graph Id in the model
     */
    id: string;

    /**
     * Graph name
     */
    name: string;

    /**
     * For example, 'SequenceDiagram', or 'UserProfile'
     */
    type: string;

    /**
     * Array of the all nodes in the graph
     */
    nodes: JsonNode[];

    /**
     * Array of all edges
     */
    edges: JsonEdge[];

    /**
     * Last assigned id for elements.
     * Elements should have unqiue ids within a graph
     * therefore, we store a counter to rember the last id.
     */
    lastId: number;
}
