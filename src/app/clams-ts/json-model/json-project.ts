import JsonGraph from './graphs/json-graph';
import JsonComponent from './graphs/json-component';
import JsonCloudProvider from './service-catalog/json-cloud-provider';

/**
 * This interface defines the shape of a project when serialized to JSON.
 * A project should be self-contained, and should not require any other information.
 * Only exception is the catalog. A project will not contain the catalog of the
 * cloud provider, since it is to large, and might be become outdated.
 * If one needs the catalog, he can bind it to the projet later.
 */
export default interface JsonProject {
    /**
     * Array of all graphs.
     */
    graphs: JsonGraph[];
    /**
     * All components that are used in the sequence diagrams
     */
    components: JsonComponent[];
    /**
     * All cloud providers and their regions,
     * which are available in the project
     */
    cloudProviders: JsonCloudProvider[];
    /**
     * Last assigned id for graphs.
     * Graphs should have unqiue ids within a project
     * therefore, we store a counter to rember the last id.
     */
    lastId: number;
}
