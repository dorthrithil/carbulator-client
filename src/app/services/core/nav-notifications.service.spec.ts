import { TestBed } from '@angular/core/testing';

import { NavNotificationsService } from './nav-notifications.service';

describe('NavNotificationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NavNotificationsService = TestBed.get(NavNotificationsService);
    expect(service).toBeTruthy();
  });
});
