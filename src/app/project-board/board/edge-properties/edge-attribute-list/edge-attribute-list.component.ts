import { Component, Input, OnInit } from '@angular/core';
import { Attribute, Message } from '@openclams/clams-ml';

@Component({
  selector: 'app-edge-attribute-list',
  templateUrl: './edge-attribute-list.component.html',
  styleUrls: ['./edge-attribute-list.component.css']
})
export class EdgeAttributeListComponent implements OnInit {
  
  @Input() message: Message;

  constructor() { }

  ngOnInit(): void {
  }

  allowed(attribute: Attribute) {
      return !attribute.id.includes('name') && !attribute.id.includes('cost') && !attribute.id.startsWith('_',0);
  }
}
