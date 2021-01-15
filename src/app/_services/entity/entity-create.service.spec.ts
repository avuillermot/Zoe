import { TestBed } from '@angular/core/testing';

import { EntityCreateService } from './entity-create.service';

describe('EntityCreateService', () => {
  let service: EntityCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntityCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
