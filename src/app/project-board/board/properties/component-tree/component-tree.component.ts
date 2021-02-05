import { Component, Input, OnInit} from '@angular/core';
import {CatalogComponentFactory, ClamsComponent} from '@openclams/clams-ml';
import { ProjectService } from 'src/app/project.service';
import {ComponentFactory} from '@openclams/clams-ml';
import {ComponentWrapper} from '@openclams/clams-ml';
import { GraphService } from 'src/app/graph.service';
import { ComponentEventType } from 'src/app/events/component-event-type';
import { JsonCatalogComponent } from '@openclams/clams-ml';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-component-tree',
  templateUrl: './component-tree.component.html',
  styleUrls: ['./component-tree.component.css']
})
export class ComponentTreeComponent implements OnInit {

  @Input() componentWrapper: ComponentWrapper;

  public parents: ClamsComponent[];
  public children: ClamsComponent[];


  constructor(private http: HttpClient, private projectService: ProjectService, 
    private graphService: GraphService) { }

  ngOnInit() {
    this.load();
  }

  load(){
    let url;
    this.parents = [];
    this.children = [];

    url = this.componentWrapper.component.cloudProvider.componentUrl+ "/"+
          this.componentWrapper.component.id+'/parents';
    this.http.get<JsonCatalogComponent[]>(url.toString()).subscribe(jsonCatalogComponents => {
      this.parents =  jsonCatalogComponents.map<ClamsComponent>(jsonCatalogComponent => {
        return CatalogComponentFactory.fromJSON(this.componentWrapper.component.cloudProvider,jsonCatalogComponent);
      }).filter(c => c);
    });
  
    url = this.componentWrapper.component.cloudProvider.componentUrl + "/"+
          this.componentWrapper.component.id+'/children';
    this.http.get<JsonCatalogComponent[]>(url.toString()).subscribe(jsonCatalogComponents => {
      this.children =  jsonCatalogComponents.map<ClamsComponent>(jsonCatalogComponent => {
        return CatalogComponentFactory.fromJSON(this.componentWrapper.component.cloudProvider,jsonCatalogComponent);
      }).filter(c => c);
    });
  }

  getComponentes(url,components:ClamsComponent[]){
    
  }

  changeTo(component: ClamsComponent) {
    const name = this.componentWrapper.component.getAttribute('name').value;
    const componentCopy = ComponentFactory.copy(component, this.projectService.project.model);
    this.componentWrapper.component = componentCopy;
    this.addNameAttribute(componentCopy, name);
    this.graphService.triggerComponentEvent(ComponentEventType.DRAW);
     this.load();
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
    }else{
      nameAttribute.value = name;
    }
  }

}
