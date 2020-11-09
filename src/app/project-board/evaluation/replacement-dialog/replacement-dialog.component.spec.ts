import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplacementDialogComponent } from './replacement-dialog.component';

describe('ReplacementDialogComponent', () => {
  let component: ReplacementDialogComponent;
  let fixture: ComponentFixture<ReplacementDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplacementDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplacementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
