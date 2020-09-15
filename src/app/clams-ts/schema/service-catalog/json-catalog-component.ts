import JsonAttribute from './json-attribute';

/**
 * This interface defines the shape of a catalog component when deserialized from JSON.
 * This interface is similar to  the JsonComponent interface, but adapted to the needs of
 * composing a catalog. JsonComponent is adapted to the needs of composing instances in the
 * sequence graph.
 */
export default interface JsonCatalogComponent {
    /**
     * Component id
     */
    id: string;

    /**
     * URL of the image, relative to the base path
     * of the cloud provider.
     */
    img: string;

    /**
     * The component's name
     */
    name: string;

    /**
     * Reference ids to child components
     */
    children: string[];

    /**
     * Optional parents field.
     * While this filed supports an arry of
     * parrents for new featuers in future,
     * we only supprt at most one parent
     * for now.
     */
    parents?: string[];

    /**
     * If not set, then the service is availabel
     * in all regions. If set with region ids, then
     * the service is avilable only in that region.
     */
    regions?: string[];

    /**
     * Array of attributes.
     */
    attributes?: JsonAttribute[];
}
