import JsonGeometry from '../../schema/graphs/json-geometry';
import Geometry from '../../model/graphs/geometry';

export default class GeometryFactory {
    public static fromJSON(jsonGeometry: JsonGeometry): Geometry {
        return new Geometry(jsonGeometry.x, jsonGeometry.y, jsonGeometry.w, jsonGeometry.h);
    }
    public static toJSON(geometry: Geometry): JsonGeometry {
        return Object.assign({}, geometry) as JsonGeometry;
    }
}
