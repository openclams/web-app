import { Injectable } from '@angular/core';
import Project from './model/project';
import Graph from './clams-ts/model/graphs/graph';
import SequenceDiagram from './clams-ts/model/graphs/sequence-diagram/sequence-diagram';
import Frame from './model/frame';
import UserProfile from './clams-ts/model/graphs/user-profile/user-profile';
import { GraphService } from './graph.service';
import { GraphEventType } from './events/graph-event-type';
import { ProjectManager } from './data-management/project-manager';
import Utils from './utils';
import Edge from './clams-ts/model/graphs/edge';
import State from './clams-ts/model/graphs/user-profile/state';
import Node from './clams-ts/model/graphs/node';
import Dot from './clams-ts/model/graphs/user-profile/dot';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  public project: Project;
  private activeFrame: Frame;

  constructor(private graphService: GraphService) {
    this.project = null;
    this.graphService.graphObserver.subscribe(graphEvent => {
      if (graphEvent.type === GraphEventType.REMOVE) {
        this.removeGraph(graphEvent.graph);
      } else if ( graphEvent.type === GraphEventType.NEW ) {
        this.addGraph(graphEvent.graph);
      }
    });
  }

  set(project: Project) {
    this.project = project;
    // Create a new frame if the project is new, and has no frame.
    if (this.project && !this.project.frames.length) {
      this.activeFrame = new Frame();
      this.project.frames.push(this.activeFrame);
    }
    this.activeFrame = this.project.frames[0];
  }

  getActiveFrame(): Frame {
    return this.activeFrame;
  }

  setActiveFrame(frame: Frame) {
    this.activeFrame = frame;
  }

  /**
   * Search whether the grpah is open in some frame
   * or not.
   */
  isGraphOpen(graph: Graph): boolean {
    return this.project.frames.filter(frame => {
      return frame.graphs.includes(graph);
    }).length > 0;
  }

  addGraph(graph: Graph) {
    this.project.model.graphs.push(graph);
  }


  removeGraph(graph: Graph) {
    // Remove from model
    Utils.removeItemFromArray(graph , this.project.model.graphs);
    const userProfiles = this.project.model.graphs.filter(g => g instanceof UserProfile);
    userProfiles.forEach(g => {
      g.nodes.filter(n => {
        const state = n as State;
        return state.sequenceDiagram === graph;
      }).forEach( match => this.removeState(match, g) );
    });
    this.graphService.update(GraphEventType.REMOVED, graph);
    // const gidx = this.project.model.graphs.findIndex(g => g.id === graph.id);
    // if (gidx !== null) {
    //   this.project.model.graphs.splice(gidx, 1);
    // }
  }

  private removeState(node: Node, graph: Graph) {
    Utils.removeItemFromArray(node , graph.nodes);
    (node as State).edgesOut.forEach(edge => this.removeArrow(edge,graph));
    (node as State).edgesIn.forEach(edge => this.removeArrow(edge,graph));
  }
  private removeArrow(edge: Edge, graph: Graph) {
    const index = graph.edges.findIndex(e => e.from === edge.from && e.to === edge.to);
    if (index > -1) {
      graph.edges.splice(index, 1);
    }
    Utils.removeItemFromArray(edge, (edge.from as State).edgesOut);
    Utils.removeItemFromArray(edge, (edge.to as State).edgesIn);
  }

}
