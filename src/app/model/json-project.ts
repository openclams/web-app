import JsonProjectMeta from './json-project-meta';
import JsonFrame from './json-frame';

import {JsonClamsProject} from '@openclams/clams-ml';

export default interface JsonProject {
    metaData: JsonProjectMeta;
    frames: JsonFrame[];
    model: JsonClamsProject;
}
