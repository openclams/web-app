import StorageDriver from './storage-driver';

/**
 * Storage driver for internal local storage of the browser.
 */
export default class LocalStorageDriver extends StorageDriver {

    /**
     * Save an object to a key-value store
     * @param key Identifier of the object
     * @param value Any serializable object
     */
    public put<T>(key: string, value: T) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    /**
     * Retrieve an object based on its key from local storage
     * @param key Identifier of the object
     * @param defaultValue Default value if key not found
     */
    public get<T>(key: string, defaultValue?: T): Promise<T> {
      return new Promise<T>((resolve, reject) => {
          const content = localStorage.getItem(key);
          if (content === null) {
            resolve(defaultValue);
          } else {
            try {
              const jsonContent = JSON.parse(content);
              // TODO: sanitiy check if jsonContent has type T
              resolve(JSON.parse(content) as T);
            } catch (e) {
              reject(e);
            }
          }
        });
    }

    /**
     * Remove object from local storage
     * @param key Identifier of the object
     */
    public delete(key: string) {
        localStorage.removeItem(key);
    }
}
