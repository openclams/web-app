import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGraphDialogComponent } from './create-graph-dialog.component';

describe('CreateGraphDialogComponent', () => {
  let component: CreateGraphDialogComponent;
  let fixture: ComponentFixture<CreateGraphDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateGraphDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGraphDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
