import Graph from '../graph';
import Dot from './dot';
import Geometry from '../geometry';
import Model from '../../model';

export default class UserProfile extends Graph {

  /**
   * Assign a unique id to an state.
   * @param prefix A prefix to make the id more informative
   */
  getNewId(prefix: string = 'State_'): string {
    return super.getNewId(prefix);
  }

  /**
   * Return the type of the graph.
   */
  public getType(): string {
    return 'UserProfile';
  }

}
