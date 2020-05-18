import { TestBed } from '@angular/core/testing';

import { LettersService } from './letters.service';

describe('LettersService', () => {
  let service: LettersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LettersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate 100 letter tiles', () => {
    const tiles = service.getAllLetters();
    expect(tiles.length).toEqual(100);
  });

});
