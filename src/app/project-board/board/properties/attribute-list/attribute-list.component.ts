import { Component, Input, OnInit } from '@angular/core';
import {Attribute} from 'clams-ml';
import {ComponentWrapper} from 'clams-ml';


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

  allowed(attribute: Attribute) {
    return !attribute.id.includes('name') && !attribute.id.includes('cost');
  }

}
