import StorageDriver from './storage-driver';

/**
 * Storage dirver for internal local storage of the browser.
 */
export default class LocalStorageDriverPrinter extends StorageDriver {

    /**
     * Save an object to a key-value store
     * @param key Identifier of the object
     * @param object Any serializable object
     */
    public put<T>(key: string, value: T) {
        const out = JSON.stringify(value);
        console.log(out);
        localStorage.setItem(key, out);
    }

    /**
     * Retrive an object based on its key from local storage
     * @param key Identifier of the object
     * @param defaultValue Default value if key not found
     */
    public get<T>(key: string, defaultValue?: T): Promise<T> {
        const promise = new Promise<T>((resolve, reject) => {
            const content = localStorage.getItem(key);
            if (content === null) {
                console.log('Default value:', defaultValue);
                resolve(defaultValue);
            } else {
                try {
                    const jsonContent = JSON.parse(content);
                    console.log(jsonContent);
                    // TODO: sanitiy check if jsonContent has type T
                    resolve(jsonContent as T);
                } catch (e) {
                    console.log('Exception:', e);
                    reject(e);
                }
            }
        });
        return promise;
    }

    /**
     * Remove object from local storage
     * @param key Identifier of the object
     */
    public delete(key: string) {
        console.log('Remove key:', key);
        localStorage.removeItem(key);
    }
}
