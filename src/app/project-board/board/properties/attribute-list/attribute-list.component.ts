import { Component, Input, OnInit } from '@angular/core';
import Attribute from 'src/app/clams-ts/model/service-catalog/attribute';
import ComponentWrapper from 'src/app/clams-ts/model/service-catalog/component-wrapper';


@Component({
  selector: 'app-attribute-list',
  templateUrl: './attribute-list.component.html',
  styleUrls: ['./attribute-list.component.css']
})
export class AttributeListComponent implements OnInit {

  @Input() componentWrapper: ComponentWrapper;

  constructor() { }

  ngOnInit() {
  }

  allowed(attribute: Attribute){
    return !attribute.id.includes('name');
  }

}
