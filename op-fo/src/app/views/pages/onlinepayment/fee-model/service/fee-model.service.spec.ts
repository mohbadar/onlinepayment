import { TestBed } from '@angular/core/testing';

import { FeeModelService } from './fee-model.service';

describe('FeeModelService', () => {
  let service: FeeModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeeModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
