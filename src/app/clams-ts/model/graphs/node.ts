import Graph from './graph';
import Geometry from './geometry';

/**
 * A generic node. This node can represent either
 * a state in the user profile, or an element in the
 * sequence diagram.
 */
export default abstract class Node {
  /**
   * Node id, which is unique within a graph.
   */
  public id: string;

  /**
   * The geometry of the node when drawn to a canvas.
   */
  public geometry: Geometry;

  /**
   * Create new node and assing automatically an unique id.
   * @param graph Reference to the graph that contains this node.
   */
  constructor(public graph: Graph) {
    if (this.graph) {
      this.id = this.graph.getNewId(this.getType());
    }
    this.geometry = new Geometry(0, 0, 0, 0);
  }

  /**
   * Return the type of the component
   */
  public abstract getType(): string;

}
