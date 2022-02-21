import { TestBed } from '@angular/core/testing';

import { CareerfirebaseService } from './careerfirebase.service';

describe('CareerfirebaseService', () => {
  let service: CareerfirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CareerfirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
