import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GraphEvent } from './events/graph-event';
import { GraphEventType } from './events/graph-event-type';
import Graph from './clams-ts/model/graphs/graph';
import { ComponentEventType } from './events/component-event-type';
import Component from './clams-ts/model/service-catalog/component';
import { ComponentEvent } from './events/component-event';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  private graphSource = new Subject<GraphEvent>();
  private sequenceDiagramSource = new Subject<ComponentEvent>();

  public sequenceDiagramObserver: Observable<ComponentEvent>;
  public graphObserver: Observable<GraphEvent>;

  constructor() {
    this.graphObserver = this.graphSource.asObservable();
    this.sequenceDiagramObserver = this.sequenceDiagramSource.asObservable();
  }

  update(graphEventType: GraphEventType, graph: Graph) {
    this.graphSource.next({ type: graphEventType, graph });
  }

  updateComponent(componentEventType: ComponentEventType, component: Component, element=null) {
    this.sequenceDiagramSource.next({ type: componentEventType, component,element});
  }
}
