import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMetaDataDialogComponent } from './project-meta-data-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InjectionToken } from '@angular/core';
import JsonProjectMeta from '../../model/json-project-meta';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectManager } from '../../data-management/project-manager';
import { By } from '@angular/platform-browser';

const testStrings: string[] = [
  'string1',
  'string1 ',
  ' string1',
  'string2',
  'string3'
];

describe('ProjectMetaDataDialogComponent', () => {
  let component: ProjectMetaDataDialogComponent;
  let fixture: ComponentFixture<ProjectMetaDataDialogComponent>;
  const noData = new InjectionToken<{ projectMeta: JsonProjectMeta }>(undefined);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectMetaDataDialogComponent],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatExpansionModule,
        MatInputModule
      ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: noData}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectMetaDataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    ProjectManager.projectMetas = [
      {
        id: undefined,
        name: testStrings[0],
        description: undefined,
        owner: undefined,
        cloudProviders: undefined
      },
      {
        id: undefined,
        name: testStrings[3],
        description: undefined,
        owner: undefined,
        cloudProviders: undefined
      }
    ];
  });

  afterEach(() => {
    ProjectManager.projectMetas = [];
    component.projectForm.reset()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#duplicateNameValidator() should recognize duplicate', () => {
    expect(component.duplicateNameValidator()({value: testStrings[0]}).duplicate).toBeTrue();
    expect(component.duplicateNameValidator()({value: testStrings[1]}).duplicate).toBeTrue();
    expect(component.duplicateNameValidator()({value: testStrings[2]}).duplicate).toBeTrue();
    expect(component.duplicateNameValidator()({value: testStrings[3]}).duplicate).toBeTrue();
  });

  it('#duplicateNameValidator() should not recognize duplicate', () => {
    expect(component.duplicateNameValidator()({value: testStrings[4]})).toBeNull();
  });

  function addLetters(letters: string) {
    component.projectForm.controls.name.setValue(component.name.value + letters);
  }

  it('#getNameErrorMsg() should return correct error message', () => {
    component.projectForm.controls.name.markAsTouched()
    expect(component.getNameErrorMsg()).toMatch('Please enter a name');
    addLetters('s');
    expect(component.getNameErrorMsg()).toMatch('');
    addLetters('tring1');
    expect(component.getNameErrorMsg()).toMatch('Name already exists');
    addLetters('0');
    expect(component.getNameErrorMsg()).toMatch('');
    // Results in 257 letters
    addLetters('x'.repeat(249));
    expect(component.getNameErrorMsg()).toMatch('Name too long');
    addLetters('x');
    expect(component.getNameErrorMsg()).toMatch('Name too long');
  });
});
