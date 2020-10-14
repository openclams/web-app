import Component from './component';
import Attribute from './attribute';
import CloudProvider from './cloud-provider';

export default class Template extends Component {

  public components: Component[];

  /**
   * Patterns are components, they do not define a particular service but
   * rather group service togther to an tree structure.
   * Pattern are the inner nodes of the tree
   * @param id A unique ID
   * @param name The human-readable name
   * @param img  The template's icon
   * @param attributes An array of attributes
   */
  constructor(public id: string,
              public name: string,
              public img: string,
              public attributes: Attribute[],
              public cloudProvider: CloudProvider
  ) {
    super(id, name, img, attributes, cloudProvider);
    this.components = [];
  }

  public getType(): string {
    return 'Template';
  }

  public bindTo(component: Template) {
    super.bindTo(component);
    this.components.forEach((c, idx) => c.bindTo(component.components[idx]));
  }
}
