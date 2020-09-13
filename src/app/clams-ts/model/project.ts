import Graph from './graphs/graph';
import ComponentWrapper from './service-catalog/component-wrapper';
import CloudProvider from './service-catalog/cloud-provider';
import Catalog from './service-catalog/catalog';

/**
 * The project class bundels all necessary information about
 * model. The project is a single unit of deployment.
 */
export default class Project {

  /**
   * An array of graphs, which can contain sequence
   * or user profile diagrams.
   */
  public graphs: Graph[];

  /**
   * An array of all components that are present in the
   * sequence diagrams in [[Project.graph]].
   */
  public components: ComponentWrapper[];

  /**
   * An array of cloud providers.
   */
  public cloudProviders: CloudProvider[];

  /**
   * Last id assignde to a an graph.
   * Everytime when we add a new graph, we
   * need to assign an unique id to the graph.
   * This counter stores the latest assigned id.
   */
  public lastId: number;

  /**
   * On init, all fields are set to empty values.
   */
  constructor() {
    this.graphs = [];
    this.components = [];
    this.cloudProviders = [];
    this.lastId = 0;
  }

  /**
   * Generate a unqique id when creating a new graph
   * in this project.
   * @param prefix The id can have a prefix to make it
   * more informative when transforming to JSON.
   */
  getNewId(prefix: string = 'Graph_'): string {
    return prefix + (this.lastId++);
  }

  /**
   * Bind the service catalog to this project.
   * Key idea. When a project gets serlialized the catalog is
   * ignored, because it is to large. In order to compute parent
   * and child nodes for the components in the sequence diagrams,
   * we need to load the service catalog and attach it to the project.
   */
  public bindTo(catalog: Catalog) {
    // replace the cloud provider object
    const idx = this.cloudProviders.findIndex(provider =>
        provider.target === catalog.cloudProvider.target
    );
    if (idx > -1) {
      this.cloudProviders[idx] = catalog.cloudProvider;
    } else {
      this.cloudProviders.push(catalog.cloudProvider);
    }
    this.components.forEach(componentWrapper => {
        const id = componentWrapper.component.id;
        const catalogComponent = catalog.getComponentById(id);
        if (catalogComponent) {
          componentWrapper.component.bindTo(catalogComponent);
        }
    });
  }
}
