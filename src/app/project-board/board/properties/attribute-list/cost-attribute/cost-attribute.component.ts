import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import CostFactory from 'src/app/clams-ts/factories/service-catalogs/cost-factory';
import Attribute from 'src/app/clams-ts/model/service-catalog/attribute';
import ClamsComponent from 'src/app/clams-ts/model/service-catalog/component';
import Cost from 'src/app/clams-ts/model/service-catalog/cost';
import Service from 'src/app/clams-ts/model/service-catalog/service';
import JsonCostLookupTable from 'src/app/clams-ts/schema/service-catalog/json-cost-lookup-table';

@Component({
  selector: 'app-cost-attribute',
  templateUrl: './cost-attribute.component.html',
  styleUrls: ['./cost-attribute.component.css']
})
export class CostAttributeComponent implements OnInit {

  costs: Cost[];
  writeable: boolean;
  @Input() component: ClamsComponent;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.addCostAttribute(this.component);

    //this.writeable = 'readable' in this.component.getAttribute() && !this.attribute.readable;

    const costUrl = this.component.cloudProvider.basePath + this.component.cloudProvider.catalogFile;

    this.http.get<JsonCostLookupTable>(costUrl).subscribe(jsonCostLookupTable => {
      this.costs = this.getCostsByService(this.component as Service,jsonCostLookupTable);
    });
  }

  loadCost(component: ClamsComponent) {
    // if (component instanceof Service) {
    //   this.costCatalogProvider.getCostLookupTable(component.cloudProvider).subscribe(jsonCostLookupTable => {
    //     this.costs = this.costCatalogProvider.getCostsByService(component as Service, jsonCostLookupTable);
    //     if (this.costs.length) {
    //       // Chose by default the first entry
    //       this.selectedCost = this.costs[0];
    //     }
    //     if (!('cost' in component.attributes)) {
          
    //     } else {

    //       this.selectedCost = component.attributes.cost.value;
    //     }
    //   });
    // }
  }

  addCostAttribute(component: ClamsComponent) {
    const costAttribute = component.getAttribute('cost');
    if (!costAttribute) {
      component.setAttribute({
        id: 'cost',
        name: 'Cost',
        type: 'cost',
        value: null, // Check name clash
        readable: false,
        img: null,
        description: 'Service cost'
      });
    }
  }

  getCostsByService(service: Service, jsonCostLookupTable: JsonCostLookupTable): Cost[] {
    let costs: Cost[] = [];
    const sidx = jsonCostLookupTable.costTable.findIndex(entry => entry.id === service.id);
    if (sidx > -1) {
      costs = jsonCostLookupTable.costTable[sidx].regions.map( costRegion => CostFactory.fromJSON(costRegion));
    }
    return costs;
  }
}
