/**
 * Geomerty information when rendering a node.
 * This geometry class will be used to represent
 * a point (x,y) or rectang (x,y,w,h) accordingly.
 */
export default class Geometry {
  /**
   * Create a geomerty object for nodes.
   * @param x x-Pos
   * @param y y-Pos
   * @param w width
   * @param h height
   */
  constructor(
    public x: number,
    public y: number,
    public w: number = 1,
    public h: number = 1
  ) {}

}
