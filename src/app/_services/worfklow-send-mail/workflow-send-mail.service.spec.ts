import { TestBed } from '@angular/core/testing';

import { WorkflowSendMailService } from './workflow-send-mail.service';

describe('WorkflowSendMailService', () => {
  let service: WorkflowSendMailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkflowSendMailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
