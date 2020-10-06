import {Graph} from 'clams-ml';

export default class Frame {

  /**
   * The open graph tabs as graph array
   */
  public graphs: Graph[];

  /**
   * The current opened graph
   */
  public activeGraph: Graph;

  /**
   * The size from left, i.e. the position of the split bar
   */
  public size: number;

  constructor() {
    this.activeGraph = null;
    this.graphs = [];
    this.size = 0;
  }

}
