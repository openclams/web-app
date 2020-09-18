import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ProjectService } from 'src/app/project.service';
import { GraphService } from 'src/app/graph.service';
import Element from 'src/app/clams-ts/model/graphs/sequence-diagram/element';
import ComponentFactory from 'src/app/clams-ts/factories/service-catalogs/component-factory';
import ComponentWrapper from 'src/app/clams-ts/model/service-catalog/component-wrapper';
import Utils from 'src/app/utils';

import { ComponentEventType } from 'src/app/events/component-event-type';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {

  @Input() element: Element;
  name: string;
  public filteredPossibleInstances: ComponentWrapper[] = [];

  componentWrapper: ComponentWrapper;

  constructor(private projectService: ProjectService, private graphService: GraphService) { }

  ngOnInit() {
    this.componentWrapper = this.element.componentWrapper;
    this.name = this.componentWrapper.component.getAttribute('name').value;
  }

  updateFilter() {
    let filterValue = '';
    if (this.name) {
      filterValue = this.name.toLowerCase();
    }

    this.filteredPossibleInstances = this.projectService.project.model.components.filter(cw =>
      cw.component.getAttribute('name').value.toLowerCase().includes(filterValue)
    ).filter(cw => cw.instances.every(node => node.graph !== this.element.graph));
  }

  existsName(name): boolean {
    return this.projectService.project.model.components.findIndex(cw => cw.component.getAttribute('name').value === name) > -1;
  }

  onSelectExistingInstance(componentWrapper: ComponentWrapper) {
    Utils.removeItemFromArray(this.element, this.element.componentWrapper.instances);
    this.element.componentWrapper = componentWrapper;
    this.projectService.componentGC();
    this.graphService.triggerComponentEvent(ComponentEventType.DRAW);
  }

  onSelectRenameInstance(name: string) {
    this.componentWrapper.component.getAttribute('name').value = name;
    this.graphService.triggerComponentEvent(ComponentEventType.DRAW);
  }

  onSelectCreateNewInstance(name: string) {
    Utils.removeItemFromArray(this.element, this.element.componentWrapper.instances);
    const componentCopy = ComponentFactory.copy(this.componentWrapper.component, this.projectService.project.model);
    componentCopy.getAttribute('name').value = name;
    const cw = new ComponentWrapper(componentCopy);
    this.element.componentWrapper = cw;
    cw.instances.push(this.element);
    this.projectService.project.model.components.push(cw);
    this.projectService.componentGC();
    this.graphService.triggerComponentEvent(ComponentEventType.DRAW);
  }

}
