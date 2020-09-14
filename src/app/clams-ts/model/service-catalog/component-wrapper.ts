import Instance from '../graphs/sequence-diagram/instance';
import Component from './component';
import Element from '../graphs/sequence-diagram/element';
/**
 * This is a helper class to ease the
 * search for all instances, that reference the same component
 * across all graphs efficently.
 */
export default  class ComponentWrapper {

  /**
   * Array of all instancs in this model that
   * reference this component.
   */
  public instances: Element[];

  constructor(public component: Component) {
    this.instances = [];
  }

}
