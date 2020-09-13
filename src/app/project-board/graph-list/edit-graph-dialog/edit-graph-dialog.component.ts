import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-edit-graph-dialog',
  templateUrl: './edit-graph-dialog.component.html',
  styleUrls: ['./edit-graph-dialog.component.css']
})
export class EditGraphDialogComponent implements OnInit {

  public graphForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<EditGraphDialogComponent>) {
               }

  ngOnInit() {
    this.graphForm = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.maxLength(100)
      ]]
    });
  }

  onCancelClick() {
    this.dialogRef.close(null);
  }

  onOk() {
    this.graphForm.markAllAsTouched();
    if (this.graphForm.invalid) {
      return;
    }

    const rawData = this.graphForm.getRawValue();

    this.dialogRef.close({
      name: rawData.name
    });
  }

  get name() {
    return this.graphForm.get('name');
  }
}
