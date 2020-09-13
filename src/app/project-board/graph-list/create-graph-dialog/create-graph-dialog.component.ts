import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-create-graph-dialog',
  templateUrl: './create-graph-dialog.component.html',
  styleUrls: ['./create-graph-dialog.component.css']
})
export class CreateGraphDialogComponent implements OnInit {

  public graphForm: FormGroup;
  public graphType: number;


  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<CreateGraphDialogComponent>) {
                this.graphType = 0;
               }

  ngOnInit() {
    this.graphType = 0;
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
      name: rawData.name,
      type: this.graphType
    });
  }

  get name() {
    return this.graphForm.get('name');
  }

}
