import { TestBed } from '@angular/core/testing';

import { WorkflowHelperService } from './workflow-helper.service';

describe('WorkflowHelperService', () => {
  let service: WorkflowHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkflowHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
