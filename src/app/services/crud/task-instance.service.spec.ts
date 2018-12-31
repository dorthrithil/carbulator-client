import {TestBed} from '@angular/core/testing';

import {TaskInstanceService} from './task-instance.service';

describe('TaskInstanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskInstanceService = TestBed.get(TaskInstanceService);
    expect(service).toBeTruthy();
  });
});
