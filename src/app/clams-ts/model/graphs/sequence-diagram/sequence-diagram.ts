import Graph from '../graph';
import Instance from './instance';
import Element from './element';

/**
 * A sequence diagramm consists of elements and messages.
 */
export default class SequenceDiagram extends Graph {

  /**
   * Return the type of this graph
   */
  public getType(): string {
    return 'SequenceDiagram';
  }

  /**
   * Assign a unique id to an element.
   * @param prefix A prefix to make the id more informative
   */
  getNewId(prefix: string = 'Element_'): string {
    return super.getNewId(prefix);
  }
}
