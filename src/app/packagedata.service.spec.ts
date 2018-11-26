import { TestBed } from '@angular/core/testing';

import { PackagedataService } from './packagedata.service';

describe('PackagedataService', () => {
  
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PackagedataService = TestBed.get(PackagedataService);
    expect(service).toBeTruthy();
  });
});
