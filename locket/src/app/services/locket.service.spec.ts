import { TestBed } from '@angular/core/testing';

import { LocketService } from './locket.service';

describe('LocketService', () => {
  let service: LocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
