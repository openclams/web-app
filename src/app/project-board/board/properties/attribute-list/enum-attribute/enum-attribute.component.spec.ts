import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnumAttributeComponent } from './enum-attribute.component';

describe('EnumAttributeComponent', () => {
  let component: EnumAttributeComponent;
  let fixture: ComponentFixture<EnumAttributeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnumAttributeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnumAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
