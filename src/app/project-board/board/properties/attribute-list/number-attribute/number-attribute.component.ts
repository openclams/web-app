import { Component, Input, OnInit } from '@angular/core';
import {Attribute} from '@openclams/clams-ml';

@Component({
  selector: 'app-number-attribute',
  templateUrl: './number-attribute.component.html',
  styleUrls: ['./number-attribute.component.css']
})
export class NumberAttributeComponent implements OnInit {

  writeable: boolean;
  @Input() attribute: Attribute;

  constructor() { }

  ngOnInit() {
    this.writeable = 'readable' in this.attribute && !this.attribute.readable;
  }

}
