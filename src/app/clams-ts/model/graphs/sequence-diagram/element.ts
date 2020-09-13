import Node from '../node';
import ComponentWrapper from '../../service-catalog/component-wrapper';
import Component from '../../service-catalog/component';
import SequenceDiagram from './sequence-diagram';

/**
 * In context of sequence diagrams,
 * an element is a node that represents a component
 * from the service catalog.
 */
export default abstract class Element extends Node {

  /**
   * An element might be embeded into an other element, i.e., a template.
   * If null, then this element is at the root.
   */
  public parent: Element;

  /**
   * Creating a new element in an sequence diagramm.
   * @param graph
   * @param componentWrapper A reference to the direct component
   * item in the components array of project. This reference can
   * be used to traverse all graphs that contain an element that
   * references the same component.
   */
  constructor(public graph: SequenceDiagram,
              public componentWrapper: ComponentWrapper) {
    super(graph);
    this.parent = null;
  }

  /**
   * Return the the component of this element
   */
  public get component(): Component {
    return this.componentWrapper.component;
  }
}
