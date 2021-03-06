import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterTileComponent } from './letter-tile.component';

describe('LetterTileComponent', () => {
  let component: LetterTileComponent;
  let fixture: ComponentFixture<LetterTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LetterTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterTileComponent);
    component = fixture.componentInstance;

    component.letter = 'A';

    fixture.detectChanges();
  });

  it('should create', () => {
    component.letter = 'A';
    expect(component).toBeTruthy();
  });
});
