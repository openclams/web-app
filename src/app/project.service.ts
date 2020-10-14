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
import Component from './clams-ts/model/service-catalog/component';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private graphService: GraphService) {
    this.project = null;
    this.graphService.addGraphListener(GraphEventType.REMOVED, graph => {
      this.removeGraph(graph);
    });
    this.graphService.addGraphListener(GraphEventType.NEW, graph => {
      // When we removed a grpah we redraw the model
      this.addGraph(graph);
    });
    this.costCache = {};
  }

  public project: Project;
  private activeFrame: Frame;

  // We rember here some preselected cost values, in case
  // the user changes often the components, we want to remember the nuber of units
    costCache: Record<string, {regionID: string, units: number}>;

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
    this.graphService.triggerGraphEvent(GraphEventType.REMOVED, graph);
    // const gidx = this.project.model.graphs.findIndex(g => g.id === graph.id);
    // if (gidx !== null) {
    //   this.project.model.graphs.splice(gidx, 1);
    // }
  }

  private removeState(node: Node, graph: Graph) {
    Utils.removeItemFromArray(node , graph.nodes);
    (node as State).edgesOut.forEach(edge => this.removeArrow(edge, graph));
    (node as State).edgesIn.forEach(edge => this.removeArrow(edge, graph));
  }
  private removeArrow(edge: Edge, graph: Graph) {
    const index = graph.edges.findIndex(e => e.from === edge.from && e.to === edge.to);
    if (index > -1) {
      graph.edges.splice(index, 1);
    }
    Utils.removeItemFromArray(edge, (edge.from as State).edgesOut);
    Utils.removeItemFromArray(edge, (edge.to as State).edgesIn);
  }

  /**
   * Purge the components array of the project
   * Search for all components that still reference
   * instances
   */
  componentGC() {
    this.project.model.components = this.project.model.components.filter(cw => cw.instances.length > 0);
  }

  getCostCache(component: Component) {
    if(!component){
      return null;
    }
    return component.id in this.costCache ? this.costCache[component.id] : null;
  }

  setCostCacheRegion(component: Component, regionId: string) {
    const item = this.getCostCache(component);
    if (!item ) {
      this.newCostCacheEntry(component);
    }
    this.costCache[component.id].regionID = regionId;
  }

  setCostCacheUnits(component: Component, units: number) {
    const item = this.getCostCache(component);
    if (!item ) {
      this.newCostCacheEntry(component);
    }
    this.costCache[component.id].units = units;
  }

  newCostCacheEntry(component: Component) {
   this.costCache[component.id] = {regionID:'', units: 0};
  }
}
