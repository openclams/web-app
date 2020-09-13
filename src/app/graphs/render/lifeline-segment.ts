import Instance from 'src/app/clams-ts/model/graphs/sequence-diagram/instance';

export class LifelineSegment {
  constructor(public instance: Instance,
              public position: number) {
  }
}
