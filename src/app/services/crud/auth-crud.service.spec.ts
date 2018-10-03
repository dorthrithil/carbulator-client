import { TestBed } from '@angular/core/testing';

import { AuthCrudService } from './auth-crud.service';

describe('AuthCrudService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthCrudService = TestBed.get(AuthCrudService);
    expect(service).toBeTruthy();
  });
});
