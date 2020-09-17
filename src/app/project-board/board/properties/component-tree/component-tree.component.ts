import { Component, Input, OnInit } from '@angular/core';
import ClamsComponent from 'src/app/clams-ts/model/service-catalog/component';


@Component({
  selector: 'app-component-tree',
  templateUrl: './component-tree.component.html',
  styleUrls: ['./component-tree.component.css']
})
export class ComponentTreeComponent implements OnInit {

  @Input() direction: boolean;
  @Input() component: ClamsComponent;
  components: ClamsComponent[];

  constructor() { }

  ngOnInit() {
    debugger;
    this.components = this.direction ? this.getParent() : this.getChildren();
  }

  getParent(){
    if(this.component.parent){
      return [this.component.parent]
    }else{
      return [];
    }
  }

  getChildren(){
    if(this.component.children){
      return this.component.children;
    }else{
      return [];
    }
  }



}
