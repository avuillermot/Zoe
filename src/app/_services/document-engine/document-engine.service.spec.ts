import { TestBed } from '@angular/core/testing';

import { DocumentEngineService } from './document-engine.service';

describe('DocumentEngineService', () => {
  let service: DocumentEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentEngineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
