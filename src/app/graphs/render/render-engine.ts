import {Graph} from 'clams-ml';
import 'mxgraph/javascript/mxClient.js';
import GraphHandler from '../graph-handler';
import {Edge} from 'clams-ml';
import {Node} from 'clams-ml';

declare var mxGraph: any;
declare var mxRubberband: any;
declare var mxEvent: any;
declare var mxKeyHandler: any;

export default abstract class RenderEngine {

    showMarker: boolean;

    isRemoved = true;

    graphHandler: GraphHandler;

    mouseIsOver: boolean;

    graph: Graph;

    mgraph: any;

    root: any;

    // rember if the last mouse down was an edge
    private edgeCell;


    constructor() {
        this.edgeCell = null;
     }

    set(graph: Graph) {
        this.graph = graph;

        const div = document.getElementById(graph.id);
        if (!div) {
        return;
        }
        // Remove the first child, which is the mxGraph svg.
        // This allows us to draw the graph completely new.
        if (div.firstChild) {
        div.innerHTML = '';
        }

        div.style.height = `97%`;
        div.style.width = `99%`;

        this.mouseIsOver = false;
        div.addEventListener('mouseover', () => {this.mouseIsOver = true; }, false);
        div.addEventListener('mouseout', () => {this.mouseIsOver = false; }, false);

        this.mgraph = new mxGraph(div);

        this.root = this.mgraph.getDefaultParent();
        const rubberband = new mxRubberband(this.mgraph);
        this.mgraph.convertValueToString = this.convertValueToString;
        this.mgraph.graphHandler.scaleGrid = true;
        this.mgraph.setGridEnabled(true);

        this.configureGraph();
        this.configureCells();
        this.configureEdges();
        this.configureStylesheet();
        this.configureSelectionStyle();
        this.registerHandlers();
        this.draw();

    }

    public selectElements(nodeBuffer: Node[], edgeBuffer: Edge[]) {
        const cells = [];
        nodeBuffer.map(n => this.mgraph.getModel().getCell(n.id)).forEach(n => cells.push(n));
        edgeBuffer.map(n => this.mgraph.getModel().getCell(n.getId())).forEach(n => cells.push(n));
        this.mgraph.setSelectionCells(cells);
      }

    private registerHandlers(): void {
        this.mgraph.addListener(null, (sender, event) => {
            if ( event.getName() === 'fireMouseEvent' &&
                event.getProperty('eventName') === 'mouseMove' ||
                event.getProperty('eventName') === 'mouseUp') {
                this.onMouseMove(event.getProperty('event').graphX,
                                event.getProperty('event').graphY);
            } else {
              //console.log(event);
            }
            if ( event.getName() === 'fireMouseEvent' &&
                event.getProperty('eventName') === 'mouseDown' ) {
                // One mouse down check if we selected an edge
                if ('sourceState' in event.getProperty('event') &&
                    event.getProperty('event').sourceState !== undefined &&
                    'cell' in event.getProperty('event').sourceState) {
                    const cell = event.getProperty('event').sourceState.cell;
                    if (cell && 'edge' in cell && cell.edge === true) {
                        this.edgeCell = cell;
                    }
                }
            }
            if (event.getName() === 'size' && this.edgeCell !== null) {
                // If the follow up event is an size event
                // the points of the edge has been changed
                console.log('[OC] onChangeEdge size', this.edgeCell);
                this.onChangeEdge(this.edgeCell);
                this.edgeCell = null;
            }
        });


        this.mgraph.addListener(mxEvent.CELLS_REMOVED, (sender, event) => {
            const cells = event.getProperty('cells') as any[];
            const nodes = cells.filter(cell => !('edge' in cell) || cell.edge === false);
            const edges = cells.filter(cell => !('edge' in cell) || cell.edge === true);

            nodes.forEach(node => {
                console.log('[OC] onRemoveNode', node);
                this.onRemoveNode(node);
            });

            edges.forEach(edge => {
                console.log('[OC] onRemoveEdge', edge);
                this.onRemoveEdge(edge);
            });
          });


        this.mgraph.addListener(mxEvent.LABEL_CHANGED, (sender, event) => {
            const newValue = event.properties.value;
            const oldValue = event.properties.old;
            const cell = event.properties.cell;
            console.log('[OC] onChangeEdge label', cell, newValue, oldValue);
            if (cell && 'edge' in cell && cell.edge === true) {
                this.onChangeEdge(cell);
            }
        });


        this.mgraph.selectionCellsHandler.addListener(mxEvent.ADD, (sender, event) => {
            const cell = event.properties.state.cell;
            if (cell && 'edge' in cell && cell.edge === true) {
                console.log('[OC] onSelectEdge ', cell );
                this.onSelectEdge(cell);
            } else  if (cell) {
                console.log('[OC] onSelectNode ', cell );
                this.onSelectNode(cell);
            }
        });

          // !!! this should be called REMOVE_SELECTION as it fires when background is clicked after selecting element(s)!
        this.mgraph.selectionCellsHandler.addListener(mxEvent.REMOVE, (sender, event) => {
            const cell = event.properties.state.cell;
            if (cell && 'edge' in cell && cell.edge === true) {
                console.log('[OC] onUnselectEdge ', cell );
                this.onUnselectEdge(cell);
            } else  if (cell) {
                console.log('[OC] onUnselectNode ', cell );
                this.onUnselectNode(cell);
            }
        });



        this.mgraph.addListener(mxEvent.DOUBLE_CLICK, (sender, event) => {
            const cell = event.getProperty('cell');
            if (cell && 'edge' in cell && cell.edge) {
                console.log('[OC] onDoubleClickEdge ', cell );
                this.onDoubleClickEdge(cell);
            } else if (cell) {
                console.log('[OC] onDoubleClickNode ', cell );
                this.onDoubleClickNode(cell);
            }
        });

        this.mgraph.addListener(mxEvent.CELLS_MOVED, (sender, event) => {
            const cells = event.getProperty('cells') as any[];
            const dx = event.getProperty('dx');
            const dy = event.getProperty('dy');
            const nodes = cells.filter(cell => !('edge' in cell) || cell.edge === false);
            const edges = cells.filter(cell => !('edge' in cell) || cell.edge === true);
            if (nodes.length > 0) {
                console.log('[OC] onMoveSelectedNodes', nodes, dx, dy);
                this.onMoveSelectedNodes(cells , dx, dy);
            }
            edges.forEach(edge => {
                console.log('[OC] onChangeEdge due to movement', edge);
                this.onChangeEdge(edge);
            });
        });

        this.mgraph.connectionHandler.addListener(mxEvent.CONNECT, (sender, event) => {
            const edge = event.getProperty('cell');
            const sourceCell = this.mgraph.getModel().getTerminal(edge, true);
            const targetCell = this.mgraph.getModel().getTerminal(edge, false);
            this.mgraph.getModel().remove(edge);
            this.onConnect(sourceCell, targetCell);
        });
    }

    // Configurations

    protected abstract configureGraph(): void;

    protected abstract configureCells(): void;

    protected abstract configureEdges(): void;

    protected abstract configureStylesheet(): void;

    protected abstract configureSelectionStyle(): void;

    protected abstract convertValueToString(cell): string;

    // Handlers

    protected onMouseMove(x: number, y: number) {
        this.graphHandler.onMouseMove(x, y);
    }

    protected abstract onMoveSelectedNodes(cells: any[] , dx: number, dy: number);

    protected abstract onDoubleClickNode(cell: any): void;
    protected abstract onDoubleClickEdge(cell: any): void;

    protected abstract  onChangeEdge(cell: any): void;

    protected abstract onSelectNode(cell: any): void;
    protected abstract onUnselectNode(cell: any): void;

    protected abstract onSelectEdge(cell: any): void;
    protected abstract onUnselectEdge(cell: any): void;

    protected abstract onRemoveNode(cell: any): void;
    protected abstract onRemoveEdge(cell: any): void;

    protected abstract onConnect(srcCell: any, dstCell: any): void;

    public abstract draw();
}
