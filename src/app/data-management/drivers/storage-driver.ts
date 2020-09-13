/**
 * Abstract storage driver
 *
 * This class provides the generall interface
 * to store object to some external or internal
 * storage system
 */
export default abstract class StorageDriver {
    /**
     * Save an object to a key-value store
     * @param key Identifier of the object
     * @param object Any serializable object
     */
    public abstract put<T>(key: string, value: T);

    /**
     * Retrive an object based on its key
     * @param key Identifier of the object
     * @param defaultValue Default value if key not found
     */
    public abstract get<T>(key: string, defaultValue?: any): Promise<T>;

    /**
     * Remove object from data store
     * @param key Identifier of the object
     */
    public abstract delete(key: string);
}
