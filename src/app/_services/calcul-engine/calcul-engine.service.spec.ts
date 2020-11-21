import { TestBed } from '@angular/core/testing';

import { CalculEngineService } from './calcul-engine.service';

describe('CalculEngineService', () => {
  let service: CalculEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculEngineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
