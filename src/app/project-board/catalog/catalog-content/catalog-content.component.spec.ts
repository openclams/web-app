import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogContentComponent } from './catalog-content.component';

describe('CatalogContentComponent', () => {
  let component: CatalogContentComponent;
  let fixture: ComponentFixture<CatalogContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
