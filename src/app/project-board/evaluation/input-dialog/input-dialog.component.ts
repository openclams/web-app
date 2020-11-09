import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import JsonEvalServer from 'src/app/model/json-eval-server';

/**
 * Dialog box to enter input parameters for the evaluation server.
 */
@Component({
  selector: 'app-input-dialog',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.css']
})
export class InputDialogComponent implements OnInit {

  public inputForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<InputDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: JsonEvalServer) { }

  /**
   * Create form from the parameters field of the
   * eval server.
   */
  ngOnInit(): void {
    const validation = {};
    this.data.parameters.args.forEach(arg =>{
      validation[arg.name] = ['', [
        Validators.required,
        Validators.maxLength(256)
      ]];
    });

    this.inputForm = this.formBuilder.group(validation);
  }

  /**
   * Validate and forward the input data to the evaluation component 
   */
  onSubmit() {
    this.inputForm.markAllAsTouched();
    if (this.inputForm.invalid) {
      return;
    }
    const rawData = this.inputForm.getRawValue();
    this.dialogRef.close(rawData);
  }

  /**
   * Close the input dialog box
   */
  onCancelClick() {
    this.dialogRef.close(null);
  }

}
