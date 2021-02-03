/**
 * The utils class provides helpful methods
 * for recurring problems, like removing
 * items from an array.
 */
export default class Utils{

    /**
     * Remove an item from an array/list
     */
    public static removeItemFromArray(item: any, list: any[]){
        const index = list.indexOf(item, 0);
        if (index > -1) {
            list.splice(index, 1);
        }
    }
}

