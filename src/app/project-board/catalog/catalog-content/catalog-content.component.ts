import {Component, OnInit, Input} from '@angular/core';
import {CloudProvider} from '@openclams/clams-ml';
import { HttpClient } from '@angular/common/http';
import { ProjectService } from 'src/app/project.service';
import {Catalog} from '@openclams/clams-ml';
import {CatalogFactory} from '@openclams/clams-ml';
import {Pattern} from '@openclams/clams-ml';
import { GraphService } from 'src/app/graph.service';
import { ElementEventType } from 'src/app/events/element-event-type';
import {ClamsComponent} from '@openclams/clams-ml';
import {ComponentFactory} from '@openclams/clams-ml';
import { ComponentEventType } from 'src/app/events/component-event-type';
import {Category} from '@openclams/clams-ml';
import {JsonCategory} from '@openclams/clams-ml';


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
    const catalogUrl = new URL(this.provider.categoryListUrl);

    this.http.get<JsonCategory[]>(catalogUrl.toString()).subscribe(jsonCategories => {

      this.catalog = new Catalog([],[],this.provider);
      jsonCategories.forEach(jsonCategory => {
        console.log(jsonCategory)
        const components = CatalogFactory.fromJSON(this.provider, jsonCategory.components);
        const category = new Category(jsonCategory.name,components);
        components.forEach(c => c.category = category);

        components.forEach(component => {
          const idx = this.catalog.components.findIndex(c => c.id === component.id)
          if(idx == -1){
            this.catalog.components.push(component)
          }
        });

        this.catalog.categories.push(category);
        
        //console.log(category.name,category.components);
      })
      this.projectService.project.model.bindTo(this.catalog);
    });
  }

  /**
   * Filter out all categories, that start with an underscore.
   * A underscore marks a categorie as hidden.
   */
  getCategories(): Category[] {
    return this.catalog.categories.filter(c => !c.name.startsWith('_'));
  }

  hasChildren(element: ClamsComponent): boolean {
    if (element instanceof Pattern) {
      return element.children.length > 0;
    }
    return false;
  }

  dragEnd(component: ClamsComponent): void {
    const componentCopy = ComponentFactory.copy(component, this.projectService.project.model);
    this.graphService.triggerComponentEvent(ComponentEventType.DRAG_END, componentCopy);
  }

  dragStart(): void {
    console.log('Start Drag');
    this.graphService.triggerComponentEvent(ComponentEventType.DRAGGING);
  }

}
