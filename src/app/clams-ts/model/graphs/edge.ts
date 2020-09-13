import Node from './node';
/**
 * A gneric (directed) Edge.
 */
export default abstract class Edge {
  /**
   * Create a (directed) Edge.
   * Both nodes should belong to the same graph
   * @param from Source node
   * @param to  Destination node
   */
  protected constructor(public from: Node,
                        public to: Node) {
  }

  /**
   * Return the type of the component
   */
  public abstract getType(): string;

  public abstract getId(): string;
}
