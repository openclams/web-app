import { TestBed } from '@angular/core/testing';

import { ProjectFileService } from './project-file.service';

describe('ProjectFileServiceService', () => {
  let service: ProjectFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
