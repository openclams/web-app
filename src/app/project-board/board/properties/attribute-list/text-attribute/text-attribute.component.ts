import { Component, Input, OnInit } from '@angular/core';
import {Attribute} from '@openclams/clams-ml';

@Component({
  selector: 'app-text-attribute',
  templateUrl: './text-attribute.component.html',
  styleUrls: ['./text-attribute.component.css']
})
export class TextAttributeComponent implements OnInit {

  writeable: boolean;
  @Input() attribute: Attribute;

  constructor() { }

  ngOnInit() {
    this.writeable = 'readable' in this.attribute && !this.attribute.readable;
  }

}
