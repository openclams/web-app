import JsonProjectMeta from './json-project-meta';
import JsonFrame from './json-frame';

import JsonClamsProject from '../clams-ts/json-model/json-project';

export default interface JsonProject {
    metaData: JsonProjectMeta;
    frames: JsonFrame[];
    model: JsonClamsProject;
}
