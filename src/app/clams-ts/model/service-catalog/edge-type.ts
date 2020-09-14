import Attribute from './attribute';
import Component from './component';

export default  class EdgeType {

  /**
   * An edge type that are linked with messages in SQDs
   * @param id Unique Edge Id
   * @param name Human-readable edge name
   * @param allowed white list of allowed connections
   * @param exclude black list of disallowed connections
   * @param attributes Array of attributes
   */
  constructor(public id: string,
              public name: string,
              public allowed: { from: Component, to: Component }[],
              public exclude: { from: Component, to: Component }[],
              public attributes: Attribute[]) {
                this.attributes = [];
                this.allowed = [];
                this.exclude = [];
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
   */
  public setAttribute(attribute: Attribute) {
    const id = this.attributes.findIndex(a => a.id === attribute.id);
    if (id < 0) {
      this.attributes.push(attribute);
    } else {
      this.attributes[id] = attribute;
    }
  }
}
