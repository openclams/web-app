import EdgeType from './edge-type';
import Component from './component';
import Category from './category';
import CloudProvider from './cloud-provider';

/**
 * The service catalog, which contains
 * all ocmponents and edges types for the use
 * in sequence diagrams.
 */
export default class Catalog {


  /**
   * Components are sorted according to categories.
   * Componentes store their category as a reserved
   * attribute with the id 'category'.
   */
  readonly categories: Category[];

  /**
   * Create a new service catalog
   * @param edges All  edgetypes for this component selection.
   * @param components All its components
   */
  constructor(public edges: EdgeType[] = [],
              public components: Component[] = [], public cloudProvider: CloudProvider) {
    this.categories = this.initCategories(components);
  }

  /**
   * Sort all components to categories. Categories are part of their
   * attributes. Default category is 'None'.
   * @param components Array of components
   */
  private  initCategories(components: Component[]): Category[] {
    const categories = [];
    for (const component of components) {
      let categoryName = 'None';
      if (component.getAttribute('category')) {
        const attr = component.getAttribute('category');
        categoryName = attr.value;
      }

      let category = categories.find((cat) => cat.name === categoryName);
      if (!category) {
        category = new Category(categoryName);
        categories.push(category);
      }
      category.components.push(component);
      component.category = category;
    }
    return categories;
  }

  public getComponentById(id: string): Component {
    return this.components.find(node => node.id === id);
  }

  public getComponentByName(name: string): Component {
    return this.components.find(eachNode => eachNode.name === name);
  }

  public getEdgeById(id: string): EdgeType {
    return this.edges.find(eachEdge => eachEdge.id === id);
  }

  public getEdgeByName(name: string): EdgeType {
    return this.edges.find(eachEdge => eachEdge.name === name);
  }

  public getComponentsByCategoryName(name: string): Component[] {
    return this.categories.find(category => category.name === name).components;
  }
}
