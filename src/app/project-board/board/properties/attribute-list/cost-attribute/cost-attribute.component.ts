import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import CostFactory from 'src/app/clams-ts/factories/service-catalogs/cost-factory';
import Attribute from 'src/app/clams-ts/model/service-catalog/attribute';
import ClamsComponent from 'src/app/clams-ts/model/service-catalog/component';
import Cost from 'src/app/clams-ts/model/service-catalog/cost';
import Service from 'src/app/clams-ts/model/service-catalog/service';
import JsonCostLookupTable from 'src/app/clams-ts/schema/service-catalog/json-cost-lookup-table';
import { ProjectService } from 'src/app/project.service';

@Component({
  selector: 'app-cost-attribute',
  templateUrl: './cost-attribute.component.html',
  styleUrls: ['./cost-attribute.component.css']
})
export class CostAttributeComponent implements OnInit {
  selectedCost: Cost;
  costs: Cost[];
  writeable: boolean;
  units: number;
  @Input() component: ClamsComponent;

  constructor(private http: HttpClient, private projectService: ProjectService) { }

  ngOnInit() {
    this.costs = [];
    this.selectedCost = null;
    const costUrl = this.component.cloudProvider.basePath + this.component.cloudProvider.costLookupFile;

    this.http.get<JsonCostLookupTable>(costUrl).subscribe(jsonCostLookupTable => {
      this.costs = this.getCostsByService(this.component as Service, jsonCostLookupTable);
      if ( this.costs.length > 0 ){
        const rid = this.projectService.getCostCache(this.component.parent)
        this.addCostAttribute(this.component, this.costs[0]);
        this.selectedCost = this.component.getAttribute('cost').value as Cost;
      }
    });
  }

  onChange(cost: Cost){
    this.component.getAttribute('cost').value = cost;
    this.selectedCost = cost;
  }

  addCostAttribute(component: ClamsComponent,defaultCost: Cost) {
    const costAttribute = component.getAttribute('cost');
    if (!costAttribute) {
      component.setAttribute({
        id: 'cost',
        name: 'Cost',
        type: 'cost',
        value: defaultCost,
        readable: false,
        img: null,
        description: 'Service cost'
      });
    }
  }

  getCostsByService(service: Service, jsonCostLookupTable: JsonCostLookupTable): Cost[] {
    let costs: Cost[] = [];
    console.log(jsonCostLookupTable);
    const sidx = jsonCostLookupTable.costTable.findIndex(entry => entry.id === service.id);
    if (sidx > -1) {
      costs = jsonCostLookupTable.costTable[sidx].regions.map( costRegion => CostFactory.fromJSON(costRegion));
    }
    return costs;
  }
}
