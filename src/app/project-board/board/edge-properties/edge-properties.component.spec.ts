import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgePropertiesComponent } from './edge-properties.component';

describe('EdgePropertiesComponent', () => {
  let component: EdgePropertiesComponent;
  let fixture: ComponentFixture<EdgePropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdgePropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
