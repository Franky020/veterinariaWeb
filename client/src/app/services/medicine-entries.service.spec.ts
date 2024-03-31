import { TestBed } from '@angular/core/testing';

import { MedicineEntriesService } from './medicine-entries.service';

describe('MedicineEntriesService', () => {
  let service: MedicineEntriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicineEntriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
