import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GraphEventType } from './events/graph-event-type';
import { Edge, Graph } from '@openclams/clams-ml';
import { Element } from '@openclams/clams-ml';
import { ElementEventType } from './events/element-event-type';
import { Component } from '@openclams/clams-ml';
import { ComponentEventType } from './events/component-event-type';
import { EdgeEventType } from './events/edge-event-type';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  private graphSources: Record<string, Subject<Graph>>;
  private elementSources: Record<string, Subject<Element>>;
  private componentSources: Record<string, Subject<Component>>;
  private edgeSources: Record<string, Subject<Edge>>;

  private graphObserver: Record<string, Observable<Graph>>;
  private elementObserver: Record<string, Observable<Element>>;
  private componentObserver: Record<string, Observable<Component>>;
  private edgeObserver: Record<string, Observable<Edge>>;


  constructor() {
    this.graphSources = {};
    this.elementSources = {};
    this.componentSources = {};
    this.edgeSources = {};

    this.graphObserver = {};
    this.elementObserver = {};
    this.componentObserver = {};
    this.edgeObserver = {};

    Object.values(GraphEventType).forEach(type => {
      if (isNaN(Number(type))) { return; }
      this.graphSources[type] = new Subject<Graph>();
      this.graphObserver[type] = this.graphSources[type].asObservable();
    });

    Object.keys(ElementEventType).forEach(type => {
      if (isNaN(Number(type))) { return; }
      this.elementSources[type] = new Subject<Element>();
      this.elementObserver[type] = this.elementSources[type].asObservable();
    });

    Object.keys(ComponentEventType).forEach(type => {
      if (isNaN(Number(type))) { return; }
      this.componentSources[type] = new Subject<Component>();
      this.componentObserver[type] = this.componentSources[type].asObservable();
    });

    Object.keys(EdgeEventType).forEach(type => {
      if (isNaN(Number(type))) { return; }
      this.edgeSources[type] = new Subject<Edge>();
      this.edgeObserver[type] = this.edgeSources[type].asObservable();
    });
  }

  addGraphListener(graphEventType: GraphEventType, fn: (graph: Graph) => void): any {
    return this.graphObserver[graphEventType].subscribe(fn);
  }

  addComponentListener(componentEventType: ComponentEventType, fn: (component: Component) => void): any {
    return this.componentObserver[componentEventType].subscribe(fn);
  }

  addElementListener(elementEventType: ElementEventType, fn: (element: Element) => void): any {
    return this.elementObserver[elementEventType].subscribe(fn);
  }

  addEdgeListener(edgeEventType: EdgeEventType, fn: (edge: Edge) => void): any {
    return this.edgeObserver[edgeEventType].subscribe(fn);
  }

  triggerGraphEvent(graphEventType: GraphEventType, graph?: Graph) {
    this.graphSources[graphEventType].next(graph);
  }

  triggerElementEvent(elementEventType: ElementEventType, element?: Element) {
    this.elementSources[elementEventType].next(element);
  }

  triggerComponentEvent(componentEventType: ComponentEventType, component?: Component) {
    this.componentSources[componentEventType].next(component);
  }

  triggerEdgeEvent(edgeEventType: EdgeEventType, edge?: Edge) {
    this.edgeSources[edgeEventType].next(edge);
  }
}
