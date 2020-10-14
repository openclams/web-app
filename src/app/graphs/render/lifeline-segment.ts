import {Instance} from 'clams-ml';

export class LifelineSegment {
  constructor(public instance: Instance,
              public position: number) {
  }
}
