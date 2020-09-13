import Attribute from './attribute';
import CloudProvider from './cloud-provider';
import Category from './category';
import Region from './region';

/**
 * Gerenic component to represent,
 *  services
 *  patterns
 *  templates
 *
 * Components form a refinement tree.
 */
export default  abstract class Component {

  public category: Category;
  public children: Component[];
  public parent: Component;

  /**
   * A component in the service catalog
   * @param id A unique ID
   * @param name The human-readable name
   * @param img  The component's icon
   * @param attributes A map of attributes
   */
  constructor(public id: string,
    public name: string,
    public img: string,
    public attributes: Attribute[],
    public cloudProvider: CloudProvider
  ) {
    this.children = [];
    this.attributes = [];
    this.parent = null;
  }

  /**
  * Returns the attribute if id exists, and undefined otherwise.
  * @param id Attribute id
  */
  public getAttribute(id: string): Attribute {
    return this.attributes.find(attribute => attribute.id === id);
  }

  /**
   * Attach or repliace an attribute
   * @param attribute
   */
  public setAttribute(attribute: Attribute) {
    const id = this.attributes.findIndex(a => a.id === attribute.id);
    if (id < 0) {
      this.attributes.push(attribute);
    } else {
      this.attributes[id] = attribute;
    }
  }

  /**
   * Is a root component in the refinement tree.
   */
  public isRoot(): boolean {
    return this.parent == null;
  }

  public bindTo(component: Component){
    this.children  = component.children;
    this.category = component.category;
    this.parent = component.parent;
    this.cloudProvider = component.cloudProvider;
  }

  /**
   * Return the type of the component
   */
  public abstract getType(): string;

}
