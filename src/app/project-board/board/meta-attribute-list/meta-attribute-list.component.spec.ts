import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaAttributeListComponent } from './meta-attribute-list.component';

describe('MetaAttributeListComponent', () => {
  let component: MetaAttributeListComponent;
  let fixture: ComponentFixture<MetaAttributeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetaAttributeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetaAttributeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
