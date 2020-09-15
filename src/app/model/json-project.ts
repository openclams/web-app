import JsonProjectMeta from './json-project-meta';
import JsonFrame from './json-frame';

import JsonClamsProject from '../clams-ts/schema/json-model';

export default interface JsonProject {
    metaData: JsonProjectMeta;
    frames: JsonFrame[];
    model: JsonClamsProject;
}
