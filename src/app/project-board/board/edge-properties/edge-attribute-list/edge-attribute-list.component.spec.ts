import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgeAttributeListComponent } from './edge-attribute-list.component';

describe('EdgeAttributeListComponent', () => {
  let component: EdgeAttributeListComponent;
  let fixture: ComponentFixture<EdgeAttributeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdgeAttributeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgeAttributeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
