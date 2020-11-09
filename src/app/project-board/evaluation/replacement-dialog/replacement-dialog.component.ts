import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import JsonReplacementProtocol from 'src/app/model/json-replacement-protocol';
import { ProjectService } from 'src/app/project.service';
import {ClamsComponent, ComponentFactory} from '@openclams/clams-ml';

@Component({
  selector: 'app-replacement-dialog',
  templateUrl: './replacement-dialog.component.html',
  styleUrls: ['./replacement-dialog.component.css']
})
export class ReplacementDialogComponent implements OnInit {

  /**
   * A clean list of the components which are involved in the
   * replacement list.
   */
  public selectionOptions:{originalComponent: ClamsComponent,
                           replacementComponent:ClamsComponent}[];

  /**
   * Current list of selected items
   */
  public selections:{ originalComponent: ClamsComponent,
                      replacementComponent:ClamsComponent}[];

  constructor(public dialogRef: MatDialogRef<ReplacementDialogComponent>,
    public projectService: ProjectService,
    @Inject(MAT_DIALOG_DATA) public data: JsonReplacementProtocol) { }

  ngOnInit(): void {
    // Remove all components from the list that have nothing to replace.
    this.data.replacements = this.data.replacements.filter(c=>c.replaceWith && c.replaceWith.length > 0);
    this.selectionOptions = this.data.replacements.map( c => {
      return {
        originalComponent: this.getComponent(c.componentIdx),
        replacementComponent:this.getComponentById(c.replaceWith)
      }
    });
  }

  /**
   * Return the correspodning component from the model based on the index.
   */
  private getComponent(idx:number):ClamsComponent{
    return this.projectService.project.model.components[idx].component;
  }

  /**
   * Return the corresponding component from the catalog based on its id.
   */
  private getComponentById(id:string):ClamsComponent{
    let component:ClamsComponent = null;
    for(const cloudProvider of this.projectService.project.model.cloudProviders){
      component = cloudProvider.catalog.getComponentById(id);
      if(component){
        break;
      }
    }
    return component;
  }

  /**
   * Replace a component in the model with a new component for all
   * instance across all graphs.
   * @param component Source component
   * @param dstComponent Replacement component
   */
  changeTo(component: ClamsComponent,dstComponent: ClamsComponent) {
    const name = component.getAttribute('name').value;
    const componentCopy = ComponentFactory.copy(dstComponent, this.projectService.project.model);
    const componentWrapper = this.projectService.project.model.components.find(cw => cw.component === component);
    componentWrapper.component = componentCopy;
    this.addNameAttribute(componentCopy, name);
  }

  addNameAttribute(component: ClamsComponent, name: string) {
    const nameAttribute = component.getAttribute('name');
    if (!nameAttribute) {
      component.setAttribute({
        id : 'name',
        img: null,
        name: 'Name',
        type: 'string',
        value: name,
        readable: false,
        description: 'Component Name'
      });
    }else{
      nameAttribute.value = name;
    }
  }

  onSelection(list){
    this.selections = list.selectedOptions.selected.map(item => item.value);
  }

  onCreate() {
    this.selections.forEach(selection => {
      this.changeTo(selection.originalComponent,selection.replacementComponent);
    });
    this.dialogRef.close();
  }

  close(){
    this.dialogRef.close();
  }

}
