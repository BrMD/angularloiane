import { TestBed } from '@angular/core/testing';

import { EncurtatorService } from './encurtator.service';

describe('EncurtatorService', () => {
  let service: EncurtatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncurtatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
