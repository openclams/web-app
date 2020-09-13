/**
 *  This interface defines the shape of a cloud region when serialized to JSON.
 */
export default interface JsonRegion {
    /**
     * Unique Region id accross a cloud provider
     */
    id: string;

    /**
     * Region name
     */
    name: string;
}
