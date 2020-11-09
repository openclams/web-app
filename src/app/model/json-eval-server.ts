/**
 * JSON schema to store data on evaluation server
 */
export default interface JsonEvalServer{
    /**
     * Name that is shown in the menu
     */
    menuTitle: string;
    /**
     * HTTP end point where send the project
     */
    url: string;
    /**
     * Some eval server might require prior input values
     * With the parameter filed, the developer can customize
     * a diaglog box, to input paramters for the evaluation server.
     */
    parameters:{
        /**
         * Header title of the dialog
         */
        head: string,
        /**
         * Additional body information
         */
        body: string,
        /**
         * Array of input fields
         */
        args:{
            /**
             * Label of the field
             */
            label:string,
            /**
             * Field name that will be send
             */
            name: string,
            /**
             * Display the unit of the input.
             * The unit will be displayed to the right of the
             * input field.
             */
            unit: string
          }[]
    };
}