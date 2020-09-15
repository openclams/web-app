import JsonAttribute from '../service-catalog/json-attribute';
import JsonRegion from '../service-catalog/json-region';

/**
 * This interface defines the shape of a component when serialized to JSON.
 * It is a union of all properties of every catalog component, such as services, patterns and templates
 * ISSUE 1: Compatibility concertns of when a template is slighly modified in the service catalog
 *          For example, thwn the minOccurences is changed.
 * ISSUE 2: The image field should not contain the URL, it should rather contain the binary of the image
 *          to make the model more selfe-containtent.
 */
export default interface JsonComponent {
    /**
     * For example, 'Service', or 'Pattern', or 'Template'
     */
    type: string;

    /**
     * Component id from the the catalog
     */
    id: string;

    /**
     * URL to the image of the component
     */
    img: string;

    /**
     * The name of Component. For example, 'T4-micro VM',
     * or 'Statefull Component'
     */
    name: string;

    /**
     * Array of attributes.
     */
    attributes: JsonAttribute[];

    /**
     * Target cloud name to reference the service catalog,
     * in order to know the origin of this component.
     */
    targetCloud: string;

    /**
     * [For Services] The regions where this component is available.
     */
    regions?: JsonRegion[];

    /**
     * [For Templates]
     * An array of componentes that belong to the template.
     */
    components?: JsonComponent[];
}
