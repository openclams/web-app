import { Component, Input, OnInit } from '@angular/core';
import { Attribute, AttributeList } from '@openclams/clams-ml';

@Component({
  selector: 'app-meta-attribute-list',
  templateUrl: './meta-attribute-list.component.html',
  styleUrls: ['./meta-attribute-list.component.css']
})
export class MetaAttributeListComponent implements OnInit {

  @Input() list: AttributeList;

  meta: Attribute[]

  constructor() { }

  ngOnInit(): void {
    this.meta = this.list.getMetaList();
  }

  addNewMeta(){
    this.list.addMeta('','');
    this.meta = this.list.getMetaList();
  }

  removeMeta(meta: Attribute){
    this.list.removeMeta(meta);
    this.meta = this.list.getMetaList();
  }

}
