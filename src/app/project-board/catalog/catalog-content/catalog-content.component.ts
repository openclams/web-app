import {Component, OnInit, Input} from '@angular/core';
import CloudProvider from 'src/app/clams-ts/model/service-catalog/cloud-provider';
import { HttpClient } from '@angular/common/http';
import { ProjectService } from 'src/app/project.service';
import JsonCatalog from 'src/app/clams-ts/json-model/service-catalog/json-catalog';
import Catalog from 'src/app/clams-ts/model/service-catalog/catalog';
import CatalogFactory from 'src/app/clams-ts/factories/service-catalogs/catalog-factory';
import Pattern from 'src/app/clams-ts/model/service-catalog/pattern';
import { GraphService } from 'src/app/graph.service';
import { ComponentEventType } from 'src/app/events/component-event-type';
import ClamsComponent from 'src/app/clams-ts/model/service-catalog/component';
import ComponentFactory from 'src/app/clams-ts/factories/service-catalogs/component-factory';


@Component({
  selector: 'app-catalog-content',
  templateUrl: './catalog-content.component.html',
  styleUrls: ['./catalog-content.component.css']
})
export class CatalogContentComponent implements OnInit {

  catalog: Catalog;
  @Input() provider: CloudProvider;

  constructor(private http: HttpClient,
              private graphService: GraphService,
              private projectService: ProjectService) {
      this.catalog = null;
  }

  ngOnInit() {
    const catalogUrl = this.provider.basePath + this.provider.catalogFile;

    this.http.get<JsonCatalog>(catalogUrl).subscribe(jsonCatalog => {
      this.catalog = CatalogFactory.fromJSON(this.provider, jsonCatalog);
      console.log(this.catalog);
      this.projectService.project.model.bindTo(this.catalog);
    });
  }

  hasChildren(element: ClamsComponent): boolean {
    if (element instanceof Pattern) {
      return element.children.length > 0;
    }
    return false;
  }

  dragEnd(component: ClamsComponent): void {
    const componentCopy = ComponentFactory.copy(component, this.projectService.project.model);
    this.graphService.updateComponent(ComponentEventType.DRAG_END, componentCopy);
  }

  dragStart(): void {
    console.log("Start Drag")
    this.graphService.updateComponent(ComponentEventType.DRAGGING, null);
  }

}
