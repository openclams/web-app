import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMetaDataDialogComponent } from './project-meta-data-dialog.component';

describe('CreateProjectDialogComponent', () => {
  let component: ProjectMetaDataDialogComponent;
  let fixture: ComponentFixture<ProjectMetaDataDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectMetaDataDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectMetaDataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
