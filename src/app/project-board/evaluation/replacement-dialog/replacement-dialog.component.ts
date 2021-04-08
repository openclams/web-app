import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import JsonReplacementProtocol from 'src/app/model/json-replacement-protocol';
import { ProjectService } from 'src/app/project.service';
import {CatalogComponentFactory, ClamsComponent, ComponentFactory, JsonCatalogComponent} from '@openclams/clams-ml';
import { HttpClient } from '@angular/common/http';
import JsonEvalServer from 'src/app/model/json-eval-server';

@Component({
  selector: 'app-replacement-dialog',
  templateUrl: './replacement-dialog.component.html',
  styleUrls: ['./replacement-dialog.component.css']
})
export class ReplacementDialogComponent implements OnInit {

  public resultText: string;

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

  constructor(private http: HttpClient, public dialogRef: MatDialogRef<ReplacementDialogComponent>,
    public projectService: ProjectService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.http.post<JsonReplacementProtocol>(this.data.server.url, this.data.param).subscribe(async res=>{
      const replacements = res.replacements.filter(c=>c.replaceWith);
      this.resultText = res.result;
      this.selectionOptions = [];
      for(const entry of replacements){
        const component = this.getComponent(entry.componentIdx);
        const replacement = await this.getReplacement(component, entry.replaceWith)
        this.selectionOptions.push({
          originalComponent: component,
          replacementComponent: replacement
        });
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
  private async  getReplacement(refComponent:ClamsComponent ,id:string):Promise<ClamsComponent>{
    const url = refComponent.cloudProvider.componentUrl + '/'+ id;
    const jsonCatalogComponent = await this.http.get<JsonCatalogComponent>(url).toPromise();
    const clamsComponent = CatalogComponentFactory.fromJSON(refComponent.cloudProvider,jsonCatalogComponent);
    return new Promise<ClamsComponent>(resolve => {
      resolve(clamsComponent);
    });
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
