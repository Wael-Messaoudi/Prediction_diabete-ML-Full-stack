import { TestBed } from '@angular/core/testing';

import { Diabeteservice } from './diabeteservice';

describe('Diabeteservice', () => {
  let service: Diabeteservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Diabeteservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
