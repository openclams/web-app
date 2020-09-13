import JsonAttribute from './json-attribute';

/**
 * This interface defines the shape of a catalog template when deserialized from JSON.
 * ISSUE 7: The min- and maxOccurence fields are not stored in the JsonComponent.
 *          It needs to be made clear, that the themplate in a grpah needs to be
 *          compared to its catalaog template when modifications are required
 */
export default interface JsonCatalogTemplate {
    /**
     * Id of the template (unqie accross all catalogs)
     */
    id: string;
    /**
     * URL to the image of the template
     */
    img: string;
    /**
     * The template's name
     */
    name: string;
    /**
     * Optionally, a template can have attributes
     */
    attributes?: JsonAttribute[];
    /**
     * The components that are part of the template
     */
    components: {
        /**
         * Ref id to a different component
         * The component should be part of the same
         * service catalog.
         */
        id: string;

        /**
         * Optional field to define how often
         * this component should be present in this
         * template
         */
        minOccurence?: number;

        /**
         * Optional field on how many times, one
         * can at most at this component to this template.
         * This field should help for the IaaS pattern.
         */
        maxOccurence?: number;
    }[];
}
