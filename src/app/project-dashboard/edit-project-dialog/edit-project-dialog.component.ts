import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectManager } from '../../data-management/project-manager';
import JsonProjectMeta from '../../model/json-project-meta';

@Component({
  selector: 'app-edit-project-dialog',
  templateUrl: './edit-project-dialog.component.html',
  styleUrls: ['./edit-project-dialog.component.css']
})
export class EditProjectDialogComponent implements OnInit {

  public projectForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<EditProjectDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {projectMeta: JsonProjectMeta} ) { }

  ngOnInit() {
    this.projectForm = this.formBuilder.group({
      name: [this.data.projectMeta.name, [
        Validators.required,
        Validators.maxLength(32)
      ]],
      description: [this.data.projectMeta.description, [
        Validators.maxLength(2048)
      ]],
      owner: [this.data.projectMeta.owner, [
        Validators.maxLength(128)
      ]],
    });
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
    const newMeta: JsonProjectMeta = {
      id: this.data.projectMeta.id,
      name: rawData.name,
      description: rawData.description,
      owner: rawData.owner,
      cloudProviders: this.data.projectMeta.cloudProviders
    };

    this.dialogRef.close(newMeta);
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
