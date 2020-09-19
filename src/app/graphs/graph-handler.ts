import Edge from '../clams-ts/model/graphs/edge';
import Node from '../clams-ts/model/graphs/node';
import Graph from '../clams-ts/model/graphs/graph';
import { GraphEventType } from '../events/graph-event-type';
import Utils from '../utils';
import { GraphService } from '../graph.service';


export default abstract class GraphHandler {

    nodeSelectionBuffer: Node[];
    edgeSelectionBuffer: Edge[];

    isActive: boolean;

    graph: Graph;

    currentMousePosition: {x: number, y: number};

    constructor() {
        this.isActive = false;
        this.currentMousePosition = {x: 0, y: 0};
    }


    public initGraphObserver(graphService: GraphService) {
        graphService.addGraphListener(GraphEventType.SELECT_ALL, () => {
            if (!this.isActive) {return; }
            this.selectAll();
        });
        graphService.addGraphListener( GraphEventType.REMOVE_SELECTION, () => {
            if (!this.isActive) {return; }
            this.removeSelection();
        });
    }

    set(graph: Graph) {
        this.nodeSelectionBuffer = [];
        this.edgeSelectionBuffer = [];
        this.graph = graph;
        this.isActive = true;
    }

    public disable() {
        this.isActive = false;
    }

    public selectAll() {
        this.nodeSelectionBuffer = this.graph.nodes.map(n => n);
        this.edgeSelectionBuffer = this.graph.edges.map(e => e);
    }

    public removeSelection() {
        while (this.nodeSelectionBuffer.length) {
            this.onRemoveNode(this.nodeSelectionBuffer.pop());
        }
        while (this.edgeSelectionBuffer.length) {
            this.onRemoveEdge(this.edgeSelectionBuffer.pop());
        }
    }


    onMouseMove(x: number, y: number) {
        this.currentMousePosition = {x, y};
    }

    public abstract onMoveSelectedNodes(nodes: Node[] , dx: number, dy: number);
    public abstract onDoubleClickNode(node: Node): void;
    public abstract onDoubleClickEdge(edge: Edge): void;
    public abstract onChangeEdge(edge: Edge, label: string): void;

    onSelectNode(node: Node) {
        this.nodeSelectionBuffer.push(node);
      }
    onUnselectNode(node: Node) {
        Utils.removeItemFromArray(node , this.nodeSelectionBuffer);
    }

    onSelectEdge(edge: Edge) {
        this.edgeSelectionBuffer.push(edge);
    }
    onUnselectEdge(edge: Edge) {
        Utils.removeItemFromArray(edge , this.edgeSelectionBuffer);
    }

    public abstract onRemoveNode(node: Node): void;
    public abstract onRemoveEdge(edge: Edge): void;

    public abstract onConnect(edge: Edge): void;

}
