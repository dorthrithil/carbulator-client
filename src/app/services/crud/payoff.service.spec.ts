import { TestBed } from '@angular/core/testing';

import { PayoffService } from './payoff.service';

describe('PayoffService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PayoffService = TestBed.get(PayoffService);
    expect(service).toBeTruthy();
  });
});
