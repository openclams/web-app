import { Component, OnInit, Input } from '@angular/core';
import ClamsComponent from 'src/app/clams-ts/model/service-catalog/component';
import { ProjectService } from 'src/app/project.service';
import { GraphService } from 'src/app/graph.service';
import { ElementEventType } from 'src/app/events/element-event-type';
import Element from 'src/app/clams-ts/model/graphs/sequence-diagram/element';
import ComponentFactory from 'src/app/clams-ts/factories/service-catalogs/component-factory';
import ComponentWrapper from 'src/app/clams-ts/model/service-catalog/component-wrapper';
import Utils from 'src/app/utils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {


  name: string;
  public filteredPossibleInstances: ComponentWrapper[] = [];

  @Input() element: Element;
  component: ClamsComponent;

  constructor(private projectService: ProjectService, private graphSeverice: GraphService) { }

  ngOnInit() {
    this.name = this.element.component.getAttribute('name').value;
    this.component = this.element.component;
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
    this.componentGC();
    // update grpah image
  }

  onSelectRenameInstance(name: string) {
    this.component.getAttribute('name').value = name;
    // update graph image
  }

  onSelectCreateNewInstance(name: string) {
    Utils.removeItemFromArray(this.element, this.element.componentWrapper.instances);
    const componentCopy = ComponentFactory.copy(this.component, this.projectService.project.model);
    componentCopy.getAttribute('name').value = name;
    const cw = new ComponentWrapper(componentCopy);
    this.element.componentWrapper = cw;
    cw.instances.push(this.element);
    this.projectService.project.model.components.push(cw);
    this.componentGC();
    // Reloade graph
  }

  /**
   * Purge the components array of the project
   * Search for all components that still reference
   * instances
   */
  componentGC() {
    this.projectService.project.model.components = this.projectService.project.model.components.filter(cw => cw.instances.length > 0);
  }

}
