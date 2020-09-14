import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import CloudProviderItem from './cloud-provider-item';
import { HttpClient } from '@angular/common/http';
import JsonCloudProvider from '../../clams-ts/json-model/service-catalog/json-cloud-provider';
import { environment } from '../../../environments/environment';
import Project from '../../model/project';
import ClamsProject from '../../clams-ts/model/model';
import CloudProviderFactory from '../../clams-ts/factories/service-catalogs/cloud-provider-factory';

@Component({
  selector: 'app-create-project-dialog',
  templateUrl: './create-project-dialog.component.html',
  styleUrls: ['./create-project-dialog.component.css']
})
export class CreateProjectDialogComponent implements OnInit {

  public projectForm: FormGroup;
  public providerList: CloudProviderItem[];

  constructor(private http: HttpClient,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<CreateProjectDialogComponent>) { }

  ngOnInit() {
    this.providerList = [];
    this.projectForm = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.maxLength(256)
      ]],
      description: ['', [
        Validators.maxLength(2048)
      ]],
      owner: ['', [
        Validators.maxLength(128)
      ]],
    });

    this.http.get<JsonCloudProvider[]>(environment.serviceServer).subscribe( cloudProviders =>
      this.providerList = cloudProviders.map(provider => {
          const item = new CloudProviderItem();
          item.provider = provider;
          item.options = provider.regions.map(r => {
            return  {
                      completed: true,
                      region: r
                    };
            });
          return item;
        })
      );
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
    this.dialogRef.close(null);
  }

  onCreate() {
    this.projectForm.markAllAsTouched();
    if (this.projectForm.invalid) {
      return;
    }
    const rawData = this.projectForm.getRawValue();
    const id = rawData.name + '_' + Date.now().toString(16);
    const project = new Project();
    project.metaData.id = id;
    project.metaData.name = rawData.name;
    project.metaData.description = rawData.description;
    project.metaData.owner = rawData.owner;

    project.metaData.cloudProviders = this.getCloudProviders();
    // Create empty model
    project.model = new ClamsProject();
    // Include Cloud Providers to model
    project.model.cloudProviders = project.metaData.cloudProviders.map(jsonCloudProvider =>
      CloudProviderFactory.fromJSON(jsonCloudProvider));

    this.dialogRef.close(project);
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

  get name() {
    return this.projectForm.get('name');
  }

  get description() {
    return this.projectForm.get('description');
  }

  get owner() {
    return this.projectForm.get('owner');
  }
}
