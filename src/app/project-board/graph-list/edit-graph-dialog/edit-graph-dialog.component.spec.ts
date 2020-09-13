import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGraphDialogComponent } from './edit-graph-dialog.component';

describe('EditGraphDialogComponent', () => {
  let component: EditGraphDialogComponent;
  let fixture: ComponentFixture<EditGraphDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGraphDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGraphDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
