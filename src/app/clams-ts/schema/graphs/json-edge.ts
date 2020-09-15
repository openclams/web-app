import JsonEdgeShape from './json-edge-shape';
import JsonEdgeType from '../service-catalog/json-edge-type';


/**
 * This interface defines the shape of an edge when serialized to JSON.
 * An edge can be of two types a Message or an Arraow.
 * This interface is a union of all properties of both types.
 * ISSUE 3: How do we behave if the edge changes in the service catalog.
 * ISSUE 4: Should we allow for edge to be copy/pasted when they changed
 *          in the service catalog?
 */
export default interface JsonEdge {
    /**
     * For example, 'Arrow' or 'Message'
     */
    type: string;

    /**
     * Srouce node id
     */
    from: string;

    /**
     * Destination node id
     */
    to: string;

    /**
     * [For Messages]
     * The edge type with is individual attributes
     */
    edgeType?: JsonEdgeType;

    /**
     * [For Messages]
     * The position on the life line from the source node.
     */
    position?: number;

    /**
     * [For Arrwos]
     * The probability value
     */
    p?: number;

    /**
     * [For Arrows]
     * Shape information of the arrow, when an arrow has
     * corners.
     */
    shape?: JsonEdgeShape;
}
