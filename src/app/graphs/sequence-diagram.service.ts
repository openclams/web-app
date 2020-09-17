import { Injectable } from '@angular/core';
import GraphHandler from './graph-handler';
import Edge from '../clams-ts/model/graphs/edge';
import Node from '../clams-ts/model/graphs/node';
import Graph from '../clams-ts/model/graphs/graph';
import { SequenceDiagramRenderService } from './render/sequence-diagram-render.service';
import { GraphService } from '../graph.service';
import Message from '../clams-ts/model/graphs/sequence-diagram/message';
import Instance from '../clams-ts/model/graphs/sequence-diagram/instance';
import Element from '../clams-ts/model/graphs/sequence-diagram/element';
import Utils from '../utils';
import Template from '../clams-ts/model/graphs/sequence-diagram/template';
import { ElementEventType } from '../events/element-event-type';
import Component from '../clams-ts/model/service-catalog/component';
import TemplateType from '../clams-ts/model/service-catalog/template';
import ComponentWrapper from '../clams-ts/model/service-catalog/component-wrapper';
import Pattern from '../clams-ts/model/service-catalog/pattern';
import Service from '../clams-ts/model/service-catalog/service';
import { SequenceConfig } from './render/configs/sequence-config';
import Geometry from '../clams-ts/model/graphs/geometry';
import ComponentFactory from '../clams-ts/factories/service-catalogs/component-factory';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import EdgeType from '../clams-ts/model/service-catalog/edge-type';
import { ComponentEventType } from '../events/component-event-type';

@Injectable({
  providedIn: 'root'
})
export class SequenceDiagramService extends GraphHandler {

  constructor(private graphService: GraphService,
              private http: HttpClient,
              private sequenceDiagramRenderService: SequenceDiagramRenderService) {
    super();
    sequenceDiagramRenderService.graphHandler = this;
    this.initGraphObserver(this.graphService);
    this.graphService.addComponentListener(ComponentEventType.DRAG_END, component =>{
      if (!this.isActive) {return; }
      if (this.sequenceDiagramRenderService.mouseIsOver) {
        this.createElement(component);
        this.sequenceDiagramRenderService.draw();
      }
    });
    this.graphService.addComponentListener(ComponentEventType.DRAW, () =>{
      if (!this.isActive) {return; }
      this.sequenceDiagramRenderService.draw();
    });
  }

  set(graph: Graph) {
    super.set(graph);
    this.sequenceDiagramRenderService.set(graph);
  }

  public selectAll() {
    super.selectAll();
    this.sequenceDiagramRenderService.selectElements(this.nodeSelectionBuffer, this.edgeSelectionBuffer);
  }

  public removeSelection() {
    super.removeSelection();
    this.sequenceDiagramRenderService.draw();
  }

  createElement(component: Component, parent: Element = null): Element {
    let element: Element = null;

    this.addNameAttribute(component);
    const componentWrapper = new ComponentWrapper(component);
    this.graph.model.components.push(componentWrapper);

    if (component instanceof TemplateType) {
      element = this.createTemplate(componentWrapper, parent);
    } else {
      console.log(componentWrapper, parent);
      element = this.createInstance(componentWrapper, parent);
    }

    if (!parent) {
      this.graph.nodes.push(element);
      // You need to return negative if the first item is smaller; positive if it it's larger, or zero if they're equal.
      this.graph.nodes.sort((n1, n2) => n1.geometry.x - n2.geometry.x);
      this.calculatePositions(element);
    }

    element.parent = parent;

    return element;

  }

  createTemplate(componentWrapper: ComponentWrapper, parent: Element = null): Template {
    const templateType = componentWrapper.component as TemplateType;
    const id =  this.graph.getNewId('Template');
    const x = this.checkCollision(this.currentMousePosition.x);
    const maxDepth = this.getMaxTemplateDepth(templateType);
    const y = SequenceConfig.VERTEX_TOP_MARGIN - maxDepth * (SequenceConfig.TEMPLATE_BOX_STROKE_DISTANCE + 14);
    const h = SequenceConfig.VERTEX_IMAGE_WIDTH_HEIGHT + 14 + 2 * maxDepth * SequenceConfig.TEMPLATE_BOX_STROKE_DISTANCE;
    const w = this.getTemplateWidth(templateType) - SequenceConfig.MARGIN_BETWEEN_VERTICES;

    const template = new Template(this.graph, componentWrapper);
    template.geometry = new Geometry(x, y, w, h);
    componentWrapper.instances.push(template);

    let innerX = SequenceConfig.TEMPLATE_BOX_STROKE_DISTANCE;

    templateType.components.forEach(component => {
      const componentCopy = ComponentFactory.copy(component, this.graph.model);
      const element = this.createElement(componentCopy, template);
      element.geometry.x = innerX;
      innerX += SequenceConfig.VERTEX_IMAGE_WIDTH_HEIGHT + SequenceConfig.MARGIN_BETWEEN_VERTICES;
      template.nodes.push(element);
    });

    return template;
  }

  getTemplateWidth(element: Component) {
    let width = 0;
    if (element instanceof TemplateType) {
      width = 2 * SequenceConfig.TEMPLATE_BOX_STROKE_DISTANCE;
      for (const n of element.components) {
        width += this.getTemplateWidth(n);
      }
    } else {
      return SequenceConfig.VERTEX_IMAGE_WIDTH_HEIGHT + SequenceConfig.MARGIN_BETWEEN_VERTICES;
    }
    return width;
  }

  getMaxTemplateDepth(element: Component) {
    let deepest = 0;
    if (element instanceof TemplateType) {
      for (const n of element.components) {
        deepest = Math.max(deepest, this.getMaxTemplateDepth(n));
      }
    } else {
      return 0;
    }
    return deepest + 1;
  }

  createInstance(componentWrapper: ComponentWrapper, parent: Element = null): Instance {
    const geometry = new Geometry(
      this.checkCollision(this.currentMousePosition.x),
      (!parent) ? SequenceConfig.VERTEX_TOP_MARGIN : SequenceConfig.TEMPLATE_BOX_STROKE_DISTANCE + 14,
      SequenceConfig.VERTEX_IMAGE_WIDTH_HEIGHT,
      SequenceConfig.VERTEX_IMAGE_WIDTH_HEIGHT,
    );
    const instance = new Instance(this.graph, componentWrapper);
    instance.geometry = geometry;
    this.getImageData(instance.component.img).subscribe((res: Response) => {
      console.log(res.blob()); }
    );

    return instance;
  }

  addNameAttribute(component: Component) {
    const nameAttribute = component.getAttribute('name');
    if (!nameAttribute) {
      component.setAttribute({
        id : 'name',
        img: null,
        name: 'Name',
        type: 'string',
        value: this.searchAndIncrement(component.name),
        readable: false,
        description: 'Component Name'
      });
    }
  }

  addCostAttribute(component: Component) {
    const costAttribute = component.getAttribute('cost');
    if (!costAttribute) {
      component.setAttribute({
        id: 'cost',
        name: 'Cost',
        type: 'cost',
        value: null,
        readable: false,
        img: null,
        description: 'Service cost'
      });
    }
  }

  onMouseMove(x: number, y: number) {
    super.onMouseMove(x, y);
    const X = this.checkCollision(x);
    this.sequenceDiagramRenderService.updateMarkerPosition(X);
  }

  onMoveSelectedNodes(nodes: Node[] , dx: number, dy: number) {
    console.log('hier', nodes);
    nodes.forEach(node => {
      node.geometry.x += dx;
      this.graph.nodes.sort((n1, n2) => n1.geometry.x - n2.geometry.x);
      this.calculatePositions(node);
    });
    this.sequenceDiagramRenderService.draw();
  }

  onDoubleClickNode(node: Node) {
    const element = node as Element;
    this.graphService.triggerElementEvent(ElementEventType.SHOW_DETAILS, element);
  }

  onDoubleClickEdge(edge: Edge) {
    return;
  }

  onChangeEdge(edge: Edge, label: string) {
    console.log("change");
    // Change the name of the edge
    return;
  }

  onRemoveNode(node: Node) {
    const element = node as Element;
    // If an element has an parent element, than it belongs to a template
    // We do not romve elements within templates, only full templates
    if (element.parent) {
      return;
    }

    if ( element instanceof Instance) {
      Utils.removeItemFromArray(element , this.graph.nodes);
      Utils.removeItemFromArray(element, element.componentWrapper.instances);
      element.edgesOut.forEach(edge => this.onRemoveEdge(edge));
      element.edgesIn.forEach(edge => this.onRemoveEdge(edge));
      // We need to check if this is the last instance of a component in the model
      // Remove the moodel's component, if this was the last instance.
      if ( element.componentWrapper.instances.length === 0) {
        Utils.removeItemFromArray(element.componentWrapper, this.graph.model.components);
      }
    } else if (element instanceof Template) {
      Utils.removeItemFromArray(element , this.graph.nodes);
      element.nodes.forEach(n => {
        n.parent = null;
        this.onRemoveNode(n);
      });
    }
  }

  onRemoveEdge(edge: Edge) {
    Utils.removeItemFromArray(edge, this.graph.edges);
    Utils.removeItemFromArray(edge, (edge.from as Instance).edgesOut);
    Utils.removeItemFromArray(edge, (edge.to as Instance).edgesIn);
  }

  onConnect(edge: Edge) {
    console.log("connect");
    const message = edge as Message;
    if( message.from !== message.to){
      message.type = this.createDefaultEdgeType();
      (message.from as Instance).edgesOut.push(message);
      (message.to as Instance).edgesIn.push(message);
      this.graph.edges.push(message);
      this.sequenceDiagramRenderService.draw();
    }
  }

  searchAndIncrement(name: string) {
    let maxInstance = 0;
    this.graph.model.components.forEach(cw => {
      if (cw.component instanceof Service || cw.component instanceof Pattern) {
        const nameRef = cw.component.getAttribute('name').value;
        const tags = nameRef.match(/(.*?)(\s+\d+$)/);
        if (tags && tags.length === 3) {
          if (name.trim() === tags[1].trim()) {
            maxInstance = Math.max(maxInstance, parseInt(tags[2], 10));
          }
        }
        if (name.trim() === nameRef.trim()) {
          maxInstance = Math.max(maxInstance, 1);
        }
      }
    });
    return (maxInstance === 0) ? name : name + ' ' + (maxInstance + 1);
  }

  checkCollision(x: number): number {
    const margin = SequenceConfig.MARGIN_BETWEEN_VERTICES;

    let newX = x;
    const box = {min: 0, max: 1};
    for (const node of this.graph.nodes) {
      if ((node as Element).parent) {continue; }

      box.min = node.geometry.x - margin / 2;
      box.max = node.geometry.x + node.geometry.w + margin / 2;

      // Collision Detection: Is x within the box
      if (box.min <= x && x <= box.max) {
        // Is it on left or right side
        if (x - box.min <= box.max - x) { // Left side
          newX = box.min;
        } else { // Right side
          newX = box.max;
        }
        break;
      }
    }
    return newX;
  }

  calculatePositions(element: Node) {
    const margin = SequenceConfig.MARGIN_BETWEEN_VERTICES;
    const width = element.geometry.w;

    const elemX =  element.geometry.x;
    let offset = 0;


    const pos = this.graph.nodes.findIndex(i => i === element);

    // Consider overlap with the previous node if not first
    if (pos > 0) {
      const prevNode = this.graph.nodes[pos - 1];
      const elemA = prevNode.geometry.x + prevNode.geometry.w + margin;
      if (elemX < elemA) {
        // There is a overlap with the previous node
        offset = elemA - elemX;
        element.geometry.x += offset;
      }
    }

    // Consider overlap with the next node if not last
    if (pos < this.graph.nodes.length - 1) {
      const nextNode = this.graph.nodes[pos + 1];
      if (nextNode.geometry.x < elemX + element.geometry.w + margin ) {
        offset += elemX + + element.geometry.w + margin - nextNode.geometry.x;
      }

      // offset += element.geometry.x + element.geometry.w;

      for (let i = pos + 1; i < this.graph.nodes.length; i++) {
        this.graph.nodes[i].geometry.x += offset;
      }
    }
  }

  getImageData(imageUrl: string): Observable<any> {
    return this.http.get(imageUrl, {  headers: {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'} });
  }

  createDefaultEdgeType(): EdgeType {
    return new EdgeType('tcp', 'TCP Connection', [], [], []);
  }
}
