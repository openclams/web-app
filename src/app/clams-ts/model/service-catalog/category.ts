import Component from './component';

export default class Category {

  /**
   * We group components by category in the side bar
   * @param name Name of the category
   * @param components Array of componentes that belong to this category
   */
  constructor(public name: string,
              public components: Component[] = []) {
  }
}
