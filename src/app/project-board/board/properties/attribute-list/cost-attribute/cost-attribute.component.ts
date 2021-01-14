import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import {CostFactory} from '@openclams/clams-ml';
import {ClamsComponent} from '@openclams/clams-ml';
import {Cost} from '@openclams/clams-ml';
import {Service} from '@openclams/clams-ml';
import {JsonCostLookupTable} from '@openclams/clams-ml';

@Component({
  selector: 'app-cost-attribute',
  templateUrl: './cost-attribute.component.html',
  styleUrls: ['./cost-attribute.component.css']
})
export class CostAttributeComponent implements OnInit {
  /**
   * The cost object that is selected by the drop-down list.
   */
  selectedCost: Cost;
  /**
   * The list of cost object for the drop-down list.
   */
  costs: Cost[];

  /**
   * Reference to the componente to which this cost attribute belongs
   */
  @Input() component: ClamsComponent;

  /**
   * Displaying the cost attribute of a component.
   * @param http We need to http client service to access the cost lookup tabel
   */
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.costs = [];
    this.selectedCost = this.getCostAttribute(this.component, new Cost(null,'',0,0));

    // Build the URL of the cost lookup table.
    const costUrl = new URL(this.component.cloudProvider.basePath, this.component.cloudProvider.costLookupFile);

    // Load all cost information of the table with respect to the service
    this.http.get<JsonCostLookupTable>(costUrl.toString()).subscribe(jsonCostLookupTable => {
      this.costs = this.getCostsByService(this.component as Service, jsonCostLookupTable);
      if(this.costs.length > 0){
        console.log(this.costs[0]);
        this.selectedCost = this.getCostAttribute(this.component, this.costs[0]);
      }
    });
  }

  /**
   * Assign new cost object to the component.
   * Takes over the number of units of the previous cost.
   */
  onChange(cost: Cost){
    cost.units = this.selectedCost.units;
    this.component.getAttribute('cost').value = cost;
    this.selectedCost = cost;
  }

  /**
   * Add a new cost attribute if it does not exist yet.
   * Assign default cost for new attribute, or when the value is not set.
   */
  getCostAttribute(component: ClamsComponent,defaultCost: Cost = null) {
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
    }else if(costAttribute && !costAttribute.value.region){
      costAttribute.value = defaultCost;
    }
    return component.getAttribute('cost').value as Cost;
  }

  /**
   * Get the cost list for the service
   * @param service The service of the component
   * @param jsonCostLookupTable The lookup tabel which contains the cost list
   */
  getCostsByService(service: Service, jsonCostLookupTable: JsonCostLookupTable): Cost[] {
    let costs: Cost[] = [];
    const sidx = jsonCostLookupTable.costTable.findIndex(entry => entry.id === service.id);
    if (sidx > -1) {
      costs = jsonCostLookupTable.costTable[sidx].regions.map( costRegion => {
        const cost = CostFactory.fromJSON(costRegion);
        // Since the units fields is not available for the cost objects int he lookup table,
        // we simply add now the units with default 0.
        cost.units = 0;
        return cost});
    }
    return costs;
  }

  /**
   * Compare two costs object for similarity to check the correct option in drop down list
   * We compare cost objects by their region id (since its unique).
   */
  compareCostObjects(o1: Cost, o2: Cost): boolean {
    return o1.region.id === o2.region.id;
  }
}
