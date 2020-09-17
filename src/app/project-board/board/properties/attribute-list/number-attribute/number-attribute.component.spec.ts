import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberAttributeComponent } from './number-attribute.component';

describe('NumberAttributeComponent', () => {
  let component: NumberAttributeComponent;
  let fixture: ComponentFixture<NumberAttributeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberAttributeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
