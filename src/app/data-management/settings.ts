import ISettable from '../model/ISettable';
import DataManagement from './data-managment';

/**
 * Store project and  model settings
 */
export default class Settings {
  /**
   * Get setting from storage
   *
   * A setting might be associated with an object `ref`, hence we
   * can have the same setting key for multiple objects, which return
   * differnt values.
   * @param key Setting key
   * @param defaultValue  default value when no setting was found
   * @param ref Reference object of the setting (works likes a namespace)
   */
  public static get<T>(key: string, defaultValue?: T, ref?: ISettable): Promise<T> {
    let storageKey = key;
    if (ref) {
      storageKey = ref.getSettingsId() + storageKey;
    }
    return DataManagement.storageDirver.get<T>(storageKey, defaultValue);
  }

  /**
   * Store setting.
   *
   * A setting can be associated with an object `ref`, hence we
   * can have the same setting key for multiple objects, which return
   * differnt values.
   * @param key Setting key
   * @param ref Reference object of the setting (works likes a namespace)
   */
  public static set<T>(key: string, value: T, ref?: ISettable) {
    let storageKey = key;
    if (ref) {
      storageKey = ref.getSettingsId() + storageKey;
    }
    DataManagement.storageDirver.put<T>(storageKey, value);
  }
}
