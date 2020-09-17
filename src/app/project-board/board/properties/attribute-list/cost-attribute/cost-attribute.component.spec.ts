import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostAttributeComponent } from './cost-attribute.component';

describe('CostAttributeComponent', () => {
  let component: CostAttributeComponent;
  let fixture: ComponentFixture<CostAttributeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostAttributeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
