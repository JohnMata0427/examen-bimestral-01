import { TestBed } from '@angular/core/testing';

import { ApiConsumptionService } from './api-consumption.service';

describe('ApiConsumptionService', () => {
  let service: ApiConsumptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiConsumptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
