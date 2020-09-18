import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GraphEventType } from './events/graph-event-type';
import Graph from './clams-ts/model/graphs/graph';
import Element from './clams-ts/model/graphs/sequence-diagram/element';
import { ElementEventType } from './events/element-event-type';
import Component from './clams-ts/model/service-catalog/component';
import { ComponentEventType } from './events/component-event-type';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  private graphSources: Record<string, Subject<Graph>>;
  private elementSources: Record<string, Subject<Element>>;
  private componentSources: Record<string, Subject<Component>>;

  private graphObserver: Record<string, Observable<Graph>>;
  private elementObserver: Record<string, Observable<Element>>;
  private componentObserver: Record<string, Observable<Component>>;


  constructor() {
    this.graphSources = {};
    this.elementSources = {};
    this.componentSources = {};

    this.graphObserver = {};
    this.elementObserver = {};
    this.componentObserver = {};

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

  triggerGraphEvent(graphEventType: GraphEventType, graph?: Graph) {
    this.graphSources[graphEventType].next(graph);
  }

  triggerElementEvent(elementEventType: ElementEventType, element?: Element) {
    this.elementSources[elementEventType].next(element);
  }

  triggerComponentEvent(componentEventType: ComponentEventType, component?: Component) {
    this.componentSources[componentEventType].next(component);
  }
}
