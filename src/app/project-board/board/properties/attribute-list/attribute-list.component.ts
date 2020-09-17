import { Component, Input, OnInit } from '@angular/core';
import Attribute from 'src/app/clams-ts/model/service-catalog/attribute';
import ClamsComponent from 'src/app/clams-ts/model/service-catalog/component';


@Component({
  selector: 'app-attribute-list',
  templateUrl: './attribute-list.component.html',
  styleUrls: ['./attribute-list.component.css']
})
export class AttributeListComponent implements OnInit {

  @Input() component: ClamsComponent; 
  attributes: Attribute[];

  constructor() { }

  ngOnInit() {
    this.attributes = this.component.attributes.filter(a => !a.id.includes('name'));
  }

}
