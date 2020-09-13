import StorageDriver from './drivers/storage-driver';


/**
 * Manage the global properties Clams
 */
export default class DataManagement {

    /**
     * Storage identifier for all registered Clams servers
     */
    static readonly KEY_SERVERS = 'ClamsServers';

    /**
     * Strage identifier for the current service server
     */
    static readonly KEY_SERVICE_CATALOG = 'ServiceServer';

    /**
     * Storage identifier of the last opened project id
     */
    static readonly KEY_LAST_PROJECT_ID = 'lastProjectID';

    /**
     * Storage identifier of the current service server
     */
    static readonly KEY_LAST_SERVER_ID = 'lastServerID';

    /**
     * Storage identifier of all project
     */
    static readonly KEY_PROJECT_DIRECTORY = 'ClamsProjectsDirectory';

    /**
     * Storage Driver to acces data
     */
    public static storageDirver: StorageDriver;

    /**
     * Set a storage dirver to access and store project data and settings.
     *
     * @param storageDirver The concrete Storage Driver instance
     */
    public static setStorageDirver(storageDirver: StorageDriver) {
        DataManagement.storageDirver = storageDirver;
    }

}
