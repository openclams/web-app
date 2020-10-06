import {JsonCloudProvider} from 'clams-ml';

/**
 * Project meta data
 *
 * The dashborad should just load for preview propose
 * important meta data of projects,
 * and not the whole project with all its grpahs.
 */
export default interface JsonProjectMeta {
    id: string;
    name: string;
    description: string;
    owner: string;
    cloudProviders: JsonCloudProvider[];
}
