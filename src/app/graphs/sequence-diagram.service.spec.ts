import { TestBed } from '@angular/core/testing';

import { SequenceDiagramService } from './sequence-diagram.service';

describe('SequenceDiagramService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SequenceDiagramService = TestBed.get(SequenceDiagramService);
    expect(service).toBeTruthy();
  });
});
