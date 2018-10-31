import { TestBed } from '@angular/core/testing';

import { CblNotificationsService } from './cbl-notifications.service';

describe('CblNotificationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CblNotificationsService = TestBed.get(CblNotificationsService);
    expect(service).toBeTruthy();
  });
});
