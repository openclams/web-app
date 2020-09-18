import { Injectable } from '@angular/core';
import GraphHandler from './graph-handler';
import Edge from '../clams-ts/model/graphs/edge';
import Node from '../clams-ts/model/graphs/node';
import { GraphService } from '../graph.service';
import { UserProfileRenderService } from './render/user-profile-render.service';
import { GraphEventType } from '../events/graph-event-type';
import Graph from '../clams-ts/model/graphs/graph';
import State from '../clams-ts/model/graphs/user-profile/state';
import SequenceDiagram from '../clams-ts/model/graphs/sequence-diagram/sequence-diagram';
import { UseCaseConfig } from './render/configs/use-case-config';
import Dot from '../clams-ts/model/graphs/user-profile/dot';
import Geometry from '../clams-ts/model/graphs/geometry';
import Arrow from '../clams-ts/model/graphs/user-profile/arrow';
import Utils from '../utils';


@Injectable({
  providedIn: 'root'
})
export class UserProfileService extends GraphHandler {



  constructor(private graphService: GraphService,
              private userProfileRenderService: UserProfileRenderService ) {
    super();
    userProfileRenderService.graphHandler = this;
    this.initGraphObserver(this.graphService);
  }

  public initGraphObserver(graphService: GraphService) {
    super.initGraphObserver(graphService);
    this.graphService.addGraphListener(GraphEventType.DRAG_END, graph => {
      if (!this.isActive) {return; }
      if (!(graph instanceof SequenceDiagram)) {
        // We only allow for SQDs to be draged in;
        return;
      }
      if (this.userProfileRenderService.mouseIsOver) {
        this.createState(graph);
        this.userProfileRenderService.draw();
      }
    });
    this.graphService.addGraphListener(GraphEventType.REMOVED, () => {
      // When we removed a grpah we redraw the model
      this.userProfileRenderService.draw();
    });
  }

  public selectAll() {
    super.selectAll();
    this.userProfileRenderService.selectElements(this.nodeSelectionBuffer, this.edgeSelectionBuffer);
  }

  public removeSelection() {
    super.removeSelection();
    this.userProfileRenderService.draw();
  }

  set(graph: Graph) {
    super.set(graph);
    if (!this.hasDot()) {
      this.createDot();
    }
    this.graph.edges.forEach(edge => this.labelProbabilityCheck(edge));
    this.userProfileRenderService.set(graph);
  }

  hasDot() {
    return this.graph.nodes.some(node => (node instanceof Dot));
  }

  createDot() {
    const dot = new Dot(this.graph);
    dot.geometry = new Geometry(200, 50 , 30, 30);
    this.graph.nodes.push(dot);
  }

  createState(graph: SequenceDiagram) {
    const state = new State(this.graph, graph);
    state.geometry.x = this.currentMousePosition.x;
    state.geometry.y = this.currentMousePosition.y;
    state.geometry.w =  UseCaseConfig.ACTIVITY_WIDTH;
    state.geometry.h = UseCaseConfig.ACTIVITY_HEIGHT;
    this.graph.nodes.push(state);
    if (this.graph.nodes.length === 2) {
      // Dot + first State
      // then add an arrow between
      this.createArrow(this.graph.nodes[0] as State, state);
    }
  }

  createArrow(src: State, dst: State) {
    const arrow = new Arrow(src, dst);
    const sumOutgoing = src.edgesOut.map(a => a.probability).reduce((previous, current) => previous + current, 0);
    if (1 - sumOutgoing <= 0) {
      arrow.probability = 0;
    } else {
      arrow.probability = 1 - sumOutgoing;
    }
    arrow.shape = [];
    src.edgesOut.push(arrow);
    dst.edgesIn.push(arrow);
    this.graph.edges.push(arrow);
  }



  onMoveSelectedNodes(nodes: Node[] , dx: number, dy: number) {
    nodes.forEach(node => {
      node.geometry.x += dx;
      node.geometry.y += dy;
    });
  }

  onDoubleClickNode(node: Node) {
    this.graphService.triggerGraphEvent(GraphEventType.OPEN, ( node as State).sequenceDiagram);
  }

  onDoubleClickEdge(edge: Edge) {
    return;
  }

  onChangeEdge(edge: Edge, label: string) {
    if (label) {
      const arrow = edge as Arrow;
      const p = parseFloat(label.replace(',', '.'));
      if (!Number.isNaN(p)) {
        arrow.probability = p;
        this.labelProbabilityCheck(arrow);
      }

      this.userProfileRenderService.draw();
    }
  }

  labelProbabilityCheck(edge: Edge) {
    const arrow = edge as Arrow & {wrongValue: boolean};
    const p = arrow.probability;
    if (!(p >= 0 && p <= 1)) {
      // Outside of value range
      arrow.wrongValue = true;
    } else if (arrow.from instanceof State && arrow.from.edgesOut.length > 0) {
      // Does not sum up to 1
      const total = arrow.from.edgesOut.map(a => a.probability)
                                      .reduce((a, b) => a + b);
      if (total !== 1) {
        arrow.from.edgesOut.forEach(e => {
          const a = e as Arrow & {wrongValue: boolean};
          a.wrongValue = true;
        });
      } else {
        arrow.from.edgesOut.forEach(e => {
          const a = e as Arrow & {wrongValue: boolean};
          a.wrongValue = false;
        });
      }
    }
  }

  onUnselectEdge(edge: Edge) {
    const index = this.edgeSelectionBuffer.findIndex(e => e.from === edge.from && e.to === edge.to);
    if (index > -1) {
      this.edgeSelectionBuffer.splice(index, 1);
    }
  }

  onRemoveNode(node: Node) {
    if (node instanceof Dot) {
      // A dot cannot be removed
      return;
    }
    Utils.removeItemFromArray(node , this.graph.nodes);
    (node as State).edgesOut.forEach(edge => this.onRemoveEdge(edge));
    (node as State).edgesIn.forEach(edge => {
      this.onRemoveEdge(edge);
      // When we delete the an icomming edge, then the probabilities
      // of the eges of the parent nodes might not sum up to one.
      // We check for every incomming edge, if the remaining outgoing edges
      // of the parent nodes still have valid probabilites.
      this.labelProbabilityCheck(edge);
    });
  }
  onRemoveEdge(edge: Edge) {
    const index = this.graph.edges.findIndex(e => e.from === edge.from && e.to === edge.to);
    if (index > -1) {
      this.graph.edges.splice(index, 1);
    }
    Utils.removeItemFromArray(edge, (edge.from as State).edgesOut);
    Utils.removeItemFromArray(edge, (edge.to as State).edgesIn);
  }

  onConnect(edge: Edge) {
    const arrow = edge as Arrow;
    if (arrow.to instanceof Dot) {
      // No arrows can connect to a dot;
      return;
    }
    (arrow.from as State).edgesOut.push(arrow);
    (arrow.to as State).edgesIn.push(arrow);
    this.graph.edges.push(arrow);
    this.userProfileRenderService.draw();
  }
}
