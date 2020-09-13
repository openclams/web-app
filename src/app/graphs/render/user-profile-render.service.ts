import { Injectable } from '@angular/core';
import RenderEngine from './render-engine';
import 'mxgraph/javascript/mxClient.js';
import { UseCaseConfig } from './configs/use-case-config';
import Graph from 'src/app/clams-ts/model/graphs/graph';
import Node from 'src/app/clams-ts/model/graphs/node';
import State from 'src/app/clams-ts/model/graphs/user-profile/state';
import Dot from 'src/app/clams-ts/model/graphs/user-profile/dot';
import Arrow from 'src/app/clams-ts/model/graphs/user-profile/arrow';
import { Styles } from './configs/styles';
import { GraphService } from 'src/app/graph.service';
import { GraphEventType } from 'src/app/events/graph-event-type';
import Edge from 'src/app/clams-ts/model/graphs/edge';

declare var mxConstants: any;
declare var mxEdgeStyle: any;
declare var mxStylesheet: any;
declare var mxGeometry: any;
@Injectable({
  providedIn: 'root'
})
export class UserProfileRenderService extends RenderEngine {


  constructor(private graphService: GraphService) {
    super();
    this.showMarker = false;
    this.graphService.graphObserver.subscribe(graphEvent => {
      if (graphEvent.type === GraphEventType.DRAGGING) {
          this.showMarker = true;
      } else if (graphEvent.type === GraphEventType.DRAG_END) {
          this.showMarker = false;
          this.removeMarker();
      }
    });
  }

  set(graph: Graph) {
    super.set(graph);
  }

  protected configureGraph(): void {
      // Disables the context menu for the given element.
      // mxGraph.mxEvent.disableContextMenu(this.root);
      // If true, pressing the enter key without pressing control or shift
      // will stop editing and accept the new value.
      this.mgraph.setEnterStopsCellEditing(true);
      this.mgraph.panningHandler.useLeftButtonForPanning = true;
      this.mgraph.setPanning(true);
      this.mgraph.setAutoSizeCells(false);
  }
  protected configureCells(): void {
      // Do not allow resizing cells
      this.mgraph.setCellsResizable(false);
      // A child should be constrained inside a
      // parent bound for move or resize operations
      this.mgraph.constrainChildren = false;
      // A parent should should not contain the child bounds
      // after resize of a child
      // This has precedence over constrainChildren.
      this.mgraph.extendParents = false;
      // Allow self refernce of mxCells
      this.mgraph.allowLoops = true;

      this.mgraph.foldingEnabled = false;
  }
  protected configureEdges(): void {
      this.mgraph.setConnectable(true);
      this.mgraph.setConnectableEdges(false);
      this.mgraph.setAllowDanglingEdges(false);
      this.mgraph.setDisconnectOnMove(false);
      this.mgraph.edgeLabelsMovable = false;
      // Enable edge connections for all points of a lifeline cell
      // along the outline. If false then edges connect to the center.
      this.mgraph.connectionHandler.outlineConnect = true;
  }
  protected configureStylesheet(): void {
      const stylesheet = new mxStylesheet();

      // edge style
      const edgeStyle = stylesheet.createDefaultEdgeStyle();
      edgeStyle[mxConstants.STYLE_STROKECOLOR] = UseCaseConfig.EDGE_COLOR;
      edgeStyle[mxConstants.STYLE_FONTCOLOR] = UseCaseConfig.BLUE_LIGHT;
      edgeStyle[mxConstants.STYLE_FONTSIZE] = UseCaseConfig.EDGE_FONT_SIZE;
      edgeStyle[mxConstants.STYLE_VERTICAL_ALIGN] = 'bottom';
      edgeStyle[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = UseCaseConfig.EDGE_LABEL_BACKGROUND_COLOR;
      edgeStyle[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
      stylesheet.putDefaultEdgeStyle(edgeStyle);

      // vertex style
      const vertexStyle = stylesheet.createDefaultVertexStyle();
      vertexStyle[mxConstants.STYLE_FILLCOLOR] = UseCaseConfig.ACTIVITY_FILL_COLOR;
      vertexStyle[mxConstants.STYLE_STROKECOLOR] = UseCaseConfig.ACTIVITY_STROKE_COLOR;
      vertexStyle[mxConstants.STYLE_STROKEWIDTH] = UseCaseConfig.ACTIVITY_STROKE_WIDTH;
      vertexStyle[mxConstants.STYLE_FONTCOLOR] = UseCaseConfig.ACTIVITY_FONT_COLOR;
      vertexStyle[mxConstants.STYLE_FONTSIZE] = UseCaseConfig.ACTIVITY_FONT_SIZE;
      vertexStyle[mxConstants.STYLE_EDITABLE] = UseCaseConfig.ACTIVITY_STYLE_EDITABLE;
      stylesheet.putDefaultVertexStyle(vertexStyle);
      this.mgraph.setStylesheet(stylesheet);
  }
  protected configureSelectionStyle(): void {
      mxConstants.EDGE_SELECTION_STROKEWIDTH = UseCaseConfig.SELECTION_STROKEWIDTH;
      mxConstants.VERTEX_SELECTION_STROKEWIDTH = UseCaseConfig.SELECTION_STROKEWIDTH;
  }
  protected convertValueToString(cell: any): string {
      const obj = cell.value;
      if (obj && obj.constructor) {
          switch (obj.constructor) {
              case State:
                  const state = obj as State;
                  // asd
                  return state.sequenceDiagram.name;
              case Dot:
                  return '';
              case Arrow:
                  const arrow = obj as Arrow;
                  return arrow.probability.toString();
          }
      }
      return '';
  }

  public draw() {
      this.mgraph.getModel().beginUpdate();
      try {
        this.mgraph.getModel().clear();
        this.root = this.mgraph.getDefaultParent();
        this.graph.nodes.forEach((element, id) => {
          switch (element.constructor) {
            case State:
              const state = element as State;
              this.createState(state);
              break;
            case Dot:
              const dot = element as Dot;
              this.createDot(dot);
              break;
          }
        });
        this.graph.edges.forEach((element, id) => {
          switch (element.constructor) {
            case Arrow:
              const arrow = element as Arrow;
              this.createArrow(arrow);
              break;
          }
        });
      } finally {
        this.mgraph.getModel().endUpdate();
      }
  }

  private createDot(dot: Dot) {
      const style = Styles.dot().asString();
      // // Do not allow multiple outgoing edges
      // this.graph.multiplicities.push(new mxMultiplicity(
      //     true,
      //     '',
      //     null,
      //     null,
      //     1,
      //     1,
      //     null,
      //     'Start point must have exactly 1 outgoing edge.',
      //     null)
      // );
      // // Do not allow incoming edges
      // this.graph.multiplicities.push(new mxMultiplicity(
      //     false,
      //     '',
      //     null,
      //     null,
      //     0,
      //     0,
      //     null,
      //     'Start point cannot have incoming edges.',
      //     null)
      // );
      this.mgraph.insertVertex(
        this.root,
        dot.id,
        dot,
        dot.geometry.x,
        dot.geometry.y,
        UseCaseConfig.ACTIVITY_START_POINT_RADIUS,
        UseCaseConfig.ACTIVITY_START_POINT_RADIUS,
        style
      );
    }

  private createState(state: State) {
      const style = Styles.state().asString();
      this.mgraph.insertVertex(
        this.root,
        state.id,
        state,
        state.geometry.x,
        state.geometry.y,
        state.geometry.w,
        state.geometry.h,
        style
      );
  }

  private createArrow(edge: Edge) {
    const arrow = edge as Arrow & {wrongValue: boolean};
    let styleString = Styles.arrow().asString();
    if('wrongValue' in arrow && arrow.wrongValue){
      styleString = Styles.redArrow().asString();
    }

    const medge = this.mgraph.insertEdge(
      this.root,
      arrow.getId(),
      arrow,
      this.mgraph.getModel().getCell(arrow.from.id),
      this.mgraph.getModel().getCell(arrow.to.id),
      styleString
    );
    medge.geometry['points'] = arrow.shape;
  }

  // Handlers
  protected onMouseMove(x: number, y: number) {
    super.onMouseMove(x, y);
    if (this.showMarker && this.mouseIsOver) {
      this.moveMarker({x, y});
    }else{
      this.removeMarker();
    }
  }

  protected onMoveSelectedNodes(cells: any[], dx: number, dy: number) {
    const nodes: Node[] = cells.map<Node>( cell => {
        const node = cell.value;
        if (node instanceof State || node instanceof Dot) {
            return node;
        }
        return null;
    }).filter(p => p);
    this.graphHandler.onMoveSelectedNodes(nodes, dx, dy);
  }

  protected onDoubleClickNode(cell: any): void {
    const state = cell.value;
    if (state instanceof State) {
      this.graphHandler.onDoubleClickNode(state);
    }
  }

  protected onDoubleClickEdge(cell: any): void {
    const arrow = cell.value;
    if (arrow instanceof Arrow) {
      this.graphHandler.onDoubleClickEdge(arrow);
    }
  }

  protected onChangeEdge(cell: any): void {
    let arrow = cell.value;
    if(typeof arrow === 'string'){
      const value = arrow;
      // When we change the label of an arrow
      // mxgraph replaces the the arrow with an string
      // so we need to infer the initial arrow form the 
      // source and target of this edge
      const sourceCell = this.mgraph.getModel().getTerminal(cell, true);
      const targetCell = this.mgraph.getModel().getTerminal(cell, false);
      arrow = (sourceCell.value as State).edgesOut.find( edge => edge.to === (targetCell.value as State)) as Arrow;
      this.graphHandler.onChangeEdge(arrow, value );
      return;
    }

    if (arrow instanceof Arrow) {
      arrow.shape = cell.geometry.points;
      this.graphHandler.onChangeEdge(arrow, null);
    }
  }
  protected onSelectNode(cell: any): void {
    const state = cell.value;
    if (state instanceof State && !(state instanceof Dot)) {
      this.graphHandler.onSelectNode(state);
    }
  }
  protected onUnselectNode(cell: any): void {
    const state = cell.value;
    if (state instanceof State && !(state instanceof Dot)) {
      this.graphHandler.onUnselectNode(state);
    }
  }
  protected onSelectEdge(cell: any): void {
    const arrow = cell.value;
    if (arrow instanceof Arrow) {
      this.graphHandler.onSelectEdge(arrow);
    }
  }
  protected onUnselectEdge(cell: any): void {
    const arrow = cell.value;
    if (arrow instanceof Arrow) {
      this.graphHandler.onUnselectEdge(arrow);
    }
  }
  protected onRemoveNode(cell: any): void {
    const state = cell.value;
    if (state instanceof State && !(state instanceof Dot)) {
      this.graphHandler.onRemoveNode(state);
    }
  }
  protected onRemoveEdge(cell: any): void {
    const arrow = cell.value;
    if (arrow instanceof Arrow) {
      this.graphHandler.onRemoveEdge(arrow);
    }
  }
  protected onConnect(srcCell: any, dstCell: any): void {
    const source = srcCell.value as State;
    const target = dstCell.value as State;
    const arrow = new Arrow(source, target);
    this.graphHandler.onConnect(arrow);
  }

  // Placing Marker

  getMarker(pos: {x: number, y: number} = {x: 0, y: 0}) {
    const model = this.mgraph.getModel();
    let markerCell = model.getCell('PlacingMarker');
    if (markerCell == null) {
      markerCell = this.mgraph.insertVertex(
        this.root,
        'PlacingMarker',
        null,
        pos.x,
        pos.y,
        UseCaseConfig.ACTIVITY_WIDTH,
        UseCaseConfig.ACTIVITY_HEIGHT,
        'strokeColor=' + UseCaseConfig.NEON_GREEN + ';fillColor=' + UseCaseConfig.NEON_GREEN
      );
    }
    return markerCell;
  }

  moveMarker(pos: {x: number, y: number}) {
    this.isRemoved = false;
    this.mgraph.getModel().beginUpdate();
    try {
      const markerCell = this.getMarker(pos);

      this.mgraph.getModel().setGeometry(markerCell,
        new mxGeometry(pos.x,
        pos.y,
        UseCaseConfig.ACTIVITY_WIDTH,
        UseCaseConfig.ACTIVITY_HEIGHT	)
        );
    } finally {
      this.mgraph.getModel().endUpdate();
    }
  }

  removeMarker() {
    if(this.isRemoved){ return;}
    const markerCell = this.getMarker();
    this.mgraph.getModel().remove(markerCell);
    this.isRemoved = true;
  }


}
