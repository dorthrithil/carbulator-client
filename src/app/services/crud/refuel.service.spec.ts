import { TestBed } from '@angular/core/testing';

import { RefuelService } from './refuel.service';

describe('RefuelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RefuelService = TestBed.get(RefuelService);
    expect(service).toBeTruthy();
  });
});
