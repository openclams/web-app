import { Injectable } from '@angular/core';
import RenderEngine from './render-engine';
import { GraphService } from 'src/app/graph.service';
import { GraphEventType } from 'src/app/events/graph-event-type';
import {Graph} from '@openclams/clams-ml';
import 'mxgraph/javascript/mxClient.js';
import { SequenceConfig } from './configs/sequence-config';
import { LifelineSegment } from './lifeline-segment';
import {Message} from '@openclams/clams-ml';
import {Element} from '@openclams/clams-ml';
import {Node} from '@openclams/clams-ml';
import { Styles } from './configs/styles';
import {Instance} from '@openclams/clams-ml';
import {Template} from '@openclams/clams-ml';
import { ElementEventType } from 'src/app/events/element-event-type';
import { ComponentEventType } from 'src/app/events/component-event-type';


declare var mxConstants: any;
declare var mxEdgeStyle: any;
declare var mxStylesheet: any;
declare var mxGeometry: any;

@Injectable({
  providedIn: 'root'
})
export class SequenceDiagramRenderService extends RenderEngine {

  constructor(private graphService: GraphService) {
    super();
    this.showMarker = false;
    this.graphService.addComponentListener(ComponentEventType.DRAGGING, () => {
      this.showMarker = true;
    });
    this.graphService.addComponentListener(ComponentEventType.DRAG_END, () => {
        this.showMarker = false;
        this.removeMarker();
    });
  }

  set(graph: Graph) {
    super.set(graph);
  }

  /**
   * Gloabl graph settings
   */
  protected configureGraph() {
    // Disables the context menu for the given element.
    // mxGraph.mxEvent.disableContextMenu(this.root);
    // If true, pressing the enter key without pressing control or shift
    // will stop editing and accept the new value.
    this.mgraph.setEnterStopsCellEditing(true);

    // this.graph.panningHandler.useLeftButtonForPanning = true;

    // this.mgraph.setPanning(true);
  }

  /**
   * Change the stroke width of the selection style
   * to makte the nodes more visibile
   */
  protected configureSelectionStyle() {
    mxConstants.EDGE_SELECTION_STROKEWIDTH = SequenceConfig.SELECTION_STROKEWIDTH;
    mxConstants.VERTEX_SELECTION_STROKEWIDTH = SequenceConfig.SELECTION_STROKEWIDTH;
  }

  /**
   * Changes the mxCell settings
   */
  protected configureCells() {
    // Do not allow resizing cells
    this.mgraph.setCellsResizable(false);
    // A child should be constrained inside a
    // parent bound for move or resize operations
    this.mgraph.constrainChildren = false;
    // A parent should should not contain the child bounds
    // after resize of a child
    // This has precedence over constrainChildren.
    this.mgraph.extendParents = false;
    // Do not allow self refernce of mxCells
    this.mgraph.allowLoops = false;
    // Do not allow folding, i.e. the collapse and
    // expand via an image icon in the graph
    this.mgraph.foldingEnabled = false;
    // Cells cannot be moved out of their parents.
    this.mgraph.graphHandler.removeCellsFromParent = false;
    // Apply auto size styles when cells are added
    this.mgraph.autoSizeCellsOnAdd = true;
    // TODO: Here we had a contradiction
    // try out what the correct setting is. (OB, 20.12.19)
    // Donot apply auto-size when cells are added
    // this.graph.autoSizeCellsOnAdd = false;
    // Allows moving of relative cells
    this.mgraph.isCellLocked = function(cell) {
      return this.isCellsLocked();
    };
    // Enables wrapping for vertex labels
    this.mgraph.isWrapping = function(cell) {
      return this.model.isCollapsed(cell);
    };
    // Do not update the cell size after a
    // lable change
    this.mgraph.setAutoSizeCells(false);
  }

  /**
   * Change edge settings
   */
  protected configureEdges() {
    // Allow new connections in the grpah
    this.mgraph.setConnectable(true);
    // Edges should not be connectable
    this.mgraph.setConnectableEdges(false);
    // Edges should allways have source and
    // traget terminals.
    this.mgraph.setAllowDanglingEdges(false);
    // Do not disconnct edges when moved
    this.mgraph.setDisconnectOnMove(false);
    // Enable edge connections for all points of a lifeline cell
    // along the outline. If false then edges connect to the center.
    this.mgraph.connectionHandler.outlineConnect = true;
    // From the doc.: The constant is a value between 0 and 1
    // that specifies the amount of the width and height
    // around the center to be used for the hotspot of a
    // cell and its default value is 0.5.
    // Here, we define the full range
    this.mgraph.connectionHandler.marker.hotspot = 1;
  }

  /**
   * Chnage the style of the edges
   */
  protected configureStylesheet() {
    const edgeStylesheet = new mxStylesheet();
    const edgeStyle = edgeStylesheet.createDefaultEdgeStyle();
    edgeStyle[mxConstants.STYLE_EDITABLE] = SequenceConfig.EDGE_EDITABLE;
    edgeStyle[mxConstants.STYLE_STROKECOLOR] = SequenceConfig.EDGE_COLOR;
    edgeStyle[mxConstants.STYLE_FONTCOLOR] = SequenceConfig.FONT_COLOR;
    edgeStyle[mxConstants.STYLE_VERTICAL_ALIGN] = 'bottom';
    edgeStyle[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = SequenceConfig.EDGE_LABEL_BACKGROUND_COLOR;
    edgeStylesheet.putDefaultEdgeStyle(edgeStyle);
    this.mgraph.setStylesheet(edgeStylesheet);
  }

  protected convertValueToString(cell: any): string {
    const obj = cell.value;
    if (obj && obj.constructor) {
      switch (obj.constructor) {
        case Instance:
          const instance  = obj as Instance;
          return instance.component.name;
        case Template:
          return '';
        case Message:
          return '';
      }
    }
    return obj;
  }

  public draw() {
      this.mgraph.getModel().beginUpdate();
      try {
        this.mgraph.getModel().clear();
        this.root = this.mgraph.getDefaultParent();
        this.graph.nodes.forEach((element, id) => {
          switch (element.constructor) {
            case Instance:
            const instance = element as Instance;
            this.createInstance(instance);
            break;
          case Template:
            const template = element as Template;
            this.createTemplate(template);
            break;
          }
        });
        this.graph.edges.forEach((element, id) => {
          switch (element.constructor) {
            case Message:
              const message = element as Message;
              this.createMessage(message);
              break;
          }
        });
      } finally {
        this.mgraph.getModel().endUpdate();
      }
  }

  private createInstance(instance: Instance, parent = null) {
    const style = Styles.instance(instance.component.img);

    if (parent) { // the instance is part of a template
      style[mxConstants.STYLE_MOVABLE] = 0;
    }

    if (parent == null) {
      parent = this.root;
    }
    const styleString = style.asString();


    const instanceVertex = this.mgraph.insertVertex(
      parent,
      instance.id,
      instance,
      instance.geometry.x,
      instance.geometry.y,
      SequenceConfig.VERTEX_IMAGE_WIDTH_HEIGHT,
      SequenceConfig.VERTEX_IMAGE_WIDTH_HEIGHT,
      styleString
    );
    instanceVertex.setConnectable(false);
    // Add label
    let name = instance.component.getAttribute('name').value;
    name = (name.length > 17) ? name.substr(0, 14) + '...' : name;

    const cell = this.mgraph.insertVertex(instanceVertex, null, name, 0, -20, 80, 20, Styles.instanceLabel().asString());
    cell.setConnectable(false);
    // cell.setMovable(false)

    const lifeLineCells = [];
    // Add lifeline
    const x = (SequenceConfig.VERTEX_IMAGE_WIDTH_HEIGHT + SequenceConfig.LIFELINE_WIDTH) / 2;
    // const numSegements = Math.max(50,50);
    for (let i = 0; i < 50; i++) {
      // offest by 5 px
      const y = SequenceConfig.VERTEX_IMAGE_WIDTH_HEIGHT + i * 5;
      const width = SequenceConfig.LIFELINE_WIDTH;
      lifeLineCells.push(this.mgraph.insertVertex(
        instanceVertex,
        instance.id + '_' + i,
        new LifelineSegment(instance, i),
        x,
        y,
        width,
        4, // The length of the line
        Styles.lifeline().asString()
      ));
    }
    this.mgraph.setCellStyles(mxConstants.STYLE_MOVABLE, 0, lifeLineCells);
  }

  private createTemplate(template: Template, parent = null) {
    if (parent == null) {
      parent = this.root;
    }

    const style = Styles.template().asString();

    const dottedVertex = this.mgraph.insertVertex(parent,
      template.id,
      template,
      template.geometry.x,
      template.geometry.y,
      template.geometry.w,
      template.geometry.h,
      style);
    dottedVertex[SequenceConfig.VERTEX_PROPERTY] = true;
    dottedVertex[SequenceConfig.CELL_TYPE_PROPERTY] = 'TemplateBox';
    dottedVertex.setConnectable(false);

    const templateImage = template.component.img;
    const x = SequenceConfig.TEMPLATE_BOX_STROKE_DISTANCE;
    const y = -SequenceConfig.VERTEX_IMAGE_WIDTH_HEIGHT / 2
      - SequenceConfig.TEMPLATE_BOX_STROKE_DISTANCE;
    const width = SequenceConfig.VERTEX_IMAGE_WIDTH_HEIGHT / 2;
    const height = SequenceConfig.VERTEX_IMAGE_WIDTH_HEIGHT / 2;

    const templateImageVertex = this.mgraph.insertVertex(dottedVertex, null, template.component.name, x, y, width, height,
      Styles.templateIcon(templateImage).asString());
    templateImageVertex[SequenceConfig.VERTEX_PROPERTY] = true;
    templateImageVertex.setConnectable(false);
    templateImageVertex[SequenceConfig.CELL_TYPE_PROPERTY] = 'TemplateIcon';


    for (const node of template.nodes) {
      if (node instanceof Instance) {
        this.createInstance(node, dottedVertex);
      }
    }
  }

  public createMessage(message: Message) {

    const styleString = Styles.message().asString();

    this.mgraph.insertEdge(
      this.root,
      message.getId(),
      message,
      this.mgraph.getModel().getCell(message.from.id + '_' + message.position),
      this.mgraph.getModel().getCell(message.to.id + '_' + message.position),
      styleString
    );
  }

  // Handlers
  protected onMouseMove(x: number, y: number) {
    super.onMouseMove(x, y);
  }

  public updateMarkerPosition(x: number) {
    if (this.showMarker && this.mouseIsOver) {
      this.moveMarker({x,  y: SequenceConfig.VERTEX_TOP_MARGIN});
    } else {
      this.removeMarker();
    }
  }

  protected onMoveSelectedNodes(cells: any[], dx: number, dy: number) {
    const elements: Node[] = cells.map<Element>( cell => {
        const node = cell.value;
        if (node instanceof Element) {
            return node;
        }
        return null;
    }).filter(p => p);
    this.graphHandler.onMoveSelectedNodes(elements, dx, dy);
  }

  protected onDoubleClickNode(cell: any): void {
    const element = cell.value;
    if (element instanceof Element) {
      this.graphHandler.onDoubleClickNode(element);
    }
  }

  protected onDoubleClickEdge(cell: any): void {
    const message = cell.value;
    if (message instanceof Message) {
      this.graphHandler.onDoubleClickEdge(message);
    }
  }

  protected onChangeEdge(cell: any): void {
    // const message = cell.value;
    // const sourceCell = this.mgraph.getModel().getTerminal(cell, true);
    // const targetCell = this.mgraph.getModel().getTerminal(cell, false);

    // const newMessage = new Message();
    // newMessage.from = sourceCell.
    // if (message instanceof Message) {
    //   this.graphHandler.onChangeEdge(message);
    // }
  }

  protected onSelectNode(cell: any): void {
    const element = cell.value;
    if (element instanceof Element) {
      this.graphHandler.onSelectNode(element);
    }
  }
  protected onUnselectNode(cell: any): void {
    const element = cell.value;
    if (element instanceof Element) {
      this.graphHandler.onUnselectNode(element);
    }
  }
  protected onSelectEdge(cell: any): void {
    const message = cell.value;
    if (message instanceof Message) {
      this.graphHandler.onSelectEdge(message);
    }
  }
  protected onUnselectEdge(cell: any): void {
    const message = cell.value;
    if (message instanceof Message) {
      this.graphHandler.onUnselectEdge(message);
    }
  }

  protected onRemoveNode(cell: any): void {
    const element = cell.value;
    if (element instanceof Element) {
      this.graphHandler.onRemoveNode(element);
    }
  }
  protected onRemoveEdge(cell: any): void {
    const message = cell.value;
    if (message instanceof Message) {
      this.graphHandler.onRemoveEdge(message);
    }
  }
  protected onConnect(srcCell: any, dstCell: any): void {
    const source = srcCell.value as LifelineSegment;
    const target = dstCell.value as LifelineSegment;
    const message = new Message(source.instance, target.instance);
    message.position = source.position;
    this.graphHandler.onConnect(message);
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
        SequenceConfig.LIFELINE_WIDTH,
        SequenceConfig.VERTEX_IMAGE_WIDTH_HEIGHT,
        'strokeColor=' + SequenceConfig.NEON_GREEN + ';fillColor=' + SequenceConfig.NEON_GREEN
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
        SequenceConfig.LIFELINE_WIDTH,
        SequenceConfig.VERTEX_IMAGE_WIDTH_HEIGHT,	)
        );
    } finally {
      this.mgraph.getModel().endUpdate();
    }
  }

  removeMarker() {
    if (this.isRemoved) { return; }
    const markerCell = this.getMarker();
    this.mgraph.getModel().remove(markerCell);
    this.isRemoved = true;
  }
}
