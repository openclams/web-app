import { TestBed } from '@angular/core/testing';

import { GraphKeyHandlerService } from './graph-key-handler.service';

describe('GraphKeyHandlerService', () => {
  let service: GraphKeyHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphKeyHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
