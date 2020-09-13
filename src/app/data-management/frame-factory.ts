import JsonFrame from '../model/json-frame';
import Frame from '../model/frame';
import Project from '../model/project';


export class FrameFactory {
    public static fromJSON(jsonFrame: JsonFrame): Frame {
        const frame = new Frame();
        frame.size = jsonFrame.size;
        if (this instanceof Project) {
            const model = this.model;
            frame.activeGraph = model.graphs.find(graph => graph.id === jsonFrame.activeGrpah);
            frame.graphs = jsonFrame.graphs.map(id => model.graphs.find(graph => graph.id === id));
        }
        return frame;
    }
    public static toJSON(frame: Frame): JsonFrame {
        return {
            graphs: frame.graphs.map(graph => graph.id),
            activeGrpah: frame.activeGraph ? frame.activeGraph.id : null,
            size: frame.size
        };
    }

}
