import Element from './element';
import Message from './message';
import ComponentWrapper from '../../service-catalog/component-wrapper';
import SequenceDiagram from './sequence-diagram';


export default class Instance extends Element {
  /**
   * Sorted array of all incomming messages.
   */
  public edgesIn: Message[] = [];

  /**
   * Sorted array of all outgoing messages.
   */
  public edgesOut: Message[] = [];

  constructor(public graph: SequenceDiagram,
              public componentWrapper: ComponentWrapper) {
    super(graph, componentWrapper);
  }

  public getType(): string {
   return 'Instance';
  }

}
