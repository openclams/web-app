import { Component, Input, OnInit} from '@angular/core';
import {ClamsComponent} from 'clams-ml';
import { ProjectService } from 'src/app/project.service';
import {ComponentFactory} from 'clams-ml';
import {ComponentWrapper} from 'clams-ml';
import { GraphService } from 'src/app/graph.service';
import { ComponentEventType } from 'src/app/events/component-event-type';


@Component({
  selector: 'app-component-tree',
  templateUrl: './component-tree.component.html',
  styleUrls: ['./component-tree.component.css']
})
export class ComponentTreeComponent implements OnInit {

  @Input() direction: boolean;

  @Input() componentWrapper: ComponentWrapper;


  constructor(private projectService: ProjectService, private graphService: GraphService) { }

  ngOnInit() {
  }

  getComponents(): ClamsComponent[] {
    return this.direction ? this.getParent() : this.getChildren();
  }

  getParent() {
    if (this.componentWrapper.component.parent) {
      return [this.componentWrapper.component.parent];
    } else {
      return [];
    }
  }

  getChildren() {
    if (this.componentWrapper.component.children) {
      return this.componentWrapper.component.children;
    } else {
      return [];
    }
  }

  changeTo(component: ClamsComponent) {
    const name = this.componentWrapper.component.getAttribute('name').value;
    const componentCopy = ComponentFactory.copy(component, this.projectService.project.model);
    this.componentWrapper.component = componentCopy;
    this.addNameAttribute(componentCopy, name);
    this.graphService.triggerComponentEvent(ComponentEventType.DRAW);
  }

  addNameAttribute(component: ClamsComponent, name: string) {
    const nameAttribute = component.getAttribute('name');
    if (!nameAttribute) {
      component.setAttribute({
        id : 'name',
        img: null,
        name: 'Name',
        type: 'string',
        value: name,
        readable: false,
        description: 'Component Name'
      });
    }
  }

}
