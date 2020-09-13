import { TestBed } from '@angular/core/testing';

import { SequenceDiagramRenderService } from './sequence-diagram-render.service';

describe('SequenceDiagramService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SequenceDiagramRenderService = TestBed.get(SequenceDiagramRenderService);
    expect(service).toBeTruthy();
  });
});
