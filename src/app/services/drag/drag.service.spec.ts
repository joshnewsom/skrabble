import { TestBed } from '@angular/core/testing';

import { DragService } from './drag.service';

describe('DragServiceService', () => {
  let service: DragService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DragService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
