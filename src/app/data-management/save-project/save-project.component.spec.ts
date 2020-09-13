import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveProjectComponent } from './save-project.component';

describe('SaveProjectComponent', () => {
  let component: SaveProjectComponent;
  let fixture: ComponentFixture<SaveProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
