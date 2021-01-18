import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import CloudProviderItem from './cloud-provider-item';
import { HttpClient } from '@angular/common/http';
import { ClamsProject, CloudProviderFactory, JsonCloudProvider } from '@openclams/clams-ml';
import { environment } from '../../../environments/environment';
import Project from '../../model/project';
import { ProjectManager } from '../../data-management/project-manager';
import JsonProjectMeta from '../../model/json-project-meta';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-project-meta-data-dialog',
  templateUrl: './project-meta-data-dialog.component.html',
  styleUrls: ['./project-meta-data-dialog.component.css']
})
export class ProjectMetaDataDialogComponent implements OnInit {

  public projectForm: FormGroup;
  public providerList: CloudProviderItem[];
  readonly isUpdate;

  constructor(private http: HttpClient,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<ProjectMetaDataDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { projectMeta: JsonProjectMeta }) {
    this.isUpdate = !!data.projectMeta;
  }

  ngOnInit() {
    this.providerList = [];
    this.projectForm = this.formBuilder.group({
      name: [this.isUpdate ? this.data.projectMeta.name : '', [
        Validators.required,
        Validators.maxLength(256),
        this.duplicateNameValidator(this.isUpdate ? this.data.projectMeta.name : undefined)
      ]],
      description: [this.isUpdate ? this.data.projectMeta.description : '', [
        Validators.maxLength(2048)
      ]],
      owner: [this.isUpdate ? this.data.projectMeta.owner : '', [
        Validators.maxLength(128)
      ]],
    });

    if (!this.isUpdate) {
      this.http.get<JsonCloudProvider[]>(environment.serviceServer).subscribe(cloudProviders =>
        this.providerList = cloudProviders.map(provider => {
          const item = new CloudProviderItem();
          item.provider = provider;
          item.options = provider.regions.map(r => {
            return {
              completed: true,
              region: r
            };
          });
          return item;
        })
      );
    }
  }

  updateAllComplete(provider: CloudProviderItem) {
    provider.allCompleted = provider.options != null
      && provider.options.every(t => t.completed);
  }

  someComplete(provider: CloudProviderItem): boolean {
    if (provider.options == null || provider.options.length === 0) {
      return false;
    }
    return provider.options.filter(t => t.completed).length > 0
      && !provider.allCompleted;
  }

  setAll(provider: CloudProviderItem, completed: boolean) {
    provider.allCompleted = completed;
    if (provider.options == null || provider.options.length === 0) {
      return;
    }
    provider.options.forEach(t => t.completed = completed);
  }

  onCancelClick() {
    this.dialogRef.close(undefined);
  }

  onSubmit() {
    this.projectForm.markAllAsTouched();
    if (this.projectForm.invalid) {
      return;
    }
    const project = new Project();

    project.metaData.name = this.name.value;
    project.metaData.description = this.description.value;
    project.metaData.owner = this.owner.value;

    if (this.isUpdate) {
      project.metaData.id = this.data.projectMeta.id;
      project.metaData.cloudProviders = this.data.projectMeta.cloudProviders;
    } else {
      project.metaData.id = this.name.value + '_' + Date.now().toString(16);
      project.metaData.cloudProviders = this.getCloudProviders();
      // Create empty project model
      project.model = new ClamsProject();
      // Include Cloud Providers to model
      project.model.cloudProviders = project.metaData.cloudProviders.map(jsonCloudProvider =>
        CloudProviderFactory.fromJSON(jsonCloudProvider));
    }
    this.dialogRef.close({
      isUpdate: this.isUpdate,
      data: project
    });
  }

  /**
   * Check if the current input name already exists in the project manager and return error if it is the case.
   * In case of update, ignore the name of this project.
   *
   * @param oldName: Name that is excluded from the duplicate check.
   *
   * @return Null if the strings do not match
   *         An object { duplicate: true } if the strings do match
   */
  duplicateNameValidator(oldName?: string) {
    return (control) => {
      for (const project of ProjectManager.projectMetas) {
        if (oldName && !oldName.localeCompare(control.value.trim())) {
          continue;
        }
        const name = project.name.toLowerCase();
        if (!name.localeCompare(control.value.trim())) {
          return {duplicate: true};
        }
      }
      return null;
    };
  }

  /**
   * Return the appropriate error message for the name input form field.
   *
   * @return One of three strings:
   *         If no input is given:    'Please enter a name'
   *         If input is too long:    'Name too long'
   *         If name exists in metas: 'Name already exists'
   */
  getNameErrorMsg() {
    return this.name.hasError('required') ? 'Please enter a name' :
      this.name.hasError('maxlength') ? 'Name too long' :
        this.name.invalid ? 'Name already exists' : '';
  }

  public getCloudProviders(): JsonCloudProvider[] {
    return this.providerList.map(item => {
      if (this.someComplete(item) || item.allCompleted) {
        const provider = item.provider;
        provider.regions = item.options.map(option => {
          if (option.completed) {
            return option.region;
          }
          return null;
        }).filter(p => p);
        return provider;
      }
      return null;
    }).filter(p => p);
  }

  get description() {
    return this.projectForm.get('description');
  }

  get name() {
    return this.projectForm.get('name');
  }

  get owner() {
    return this.projectForm.get('owner');
  }
}
