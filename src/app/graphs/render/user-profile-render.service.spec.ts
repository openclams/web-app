import { TestBed } from '@angular/core/testing';

import { UserProfileRenderService } from './user-profile-render.service';

describe('UserProfileRenderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserProfileRenderService = TestBed.get(UserProfileRenderService);
    expect(service).toBeTruthy();
  });
});
