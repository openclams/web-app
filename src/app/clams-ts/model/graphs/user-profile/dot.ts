import State from './state';
import UserProfile from './user-profile';

/**
 * A dot is a special state that does not reference a
 * sequence diagramm. A dot is the entry point of the
 * user profile. Every user profile should have only one dot.
 */
export default class Dot extends State {
  constructor(graph: UserProfile) {
    super(graph, null);
  }

  public getType(): string {
    return 'Dot';
  }
}
