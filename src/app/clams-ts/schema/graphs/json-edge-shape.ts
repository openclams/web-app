/**
 * Arrows in user profiles can have multiple
 * corners. We use this representation as
 * container to store the coordiante of an arrow.
 * This interfce might be still subject to change.
 */
export default interface JsonEdgeShape {
    corners: {x: number, y: number}[];
}
