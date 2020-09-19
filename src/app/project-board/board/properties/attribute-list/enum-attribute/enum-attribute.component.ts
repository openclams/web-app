import { Component, Input, OnInit } from '@angular/core';
import Attribute from 'src/app/clams-ts/model/service-catalog/attribute';

@Component({
  selector: 'app-enum-attribute',
  templateUrl: './enum-attribute.component.html',
  styleUrls: ['./enum-attribute.component.css']
})
export class EnumAttributeComponent implements OnInit {

  writeable: boolean;
  @Input() attribute: Attribute;

  constructor() { }

  ngOnInit() {
    this.writeable = 'readable' in this.attribute && !this.attribute.readable;
  }
}