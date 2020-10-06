import ISettable from './ISettable';
import Frame from './frame';
import JsonProjectMeta from './json-project-meta';
import {ClamsProject} from 'clams-ml';

export default class Project implements ISettable {

  private readonly PREFIX_PROJECT: string = 'Project_';

  public metaData: JsonProjectMeta;

  public model: ClamsProject;

  public frames: Frame[];

  constructor() {
    this.model = null;
    this.metaData = {
      id: '',
      cloudProviders: [],
      description: '',
      name: '',
      owner: ''
    };
    this.frames = [];
  }

  getSettingsId() {
    return this.PREFIX_PROJECT + this.metaData.id;
  }
}
