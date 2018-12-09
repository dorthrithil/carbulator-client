import {TestBed} from '@angular/core/testing';

import {MobileDetectionService} from './mobile-detection.service';

describe('MobileDetectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MobileDetectionService = TestBed.get(MobileDetectionService);
    expect(service).toBeTruthy();
  });
});
