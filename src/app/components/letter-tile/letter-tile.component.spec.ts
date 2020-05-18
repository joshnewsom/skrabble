import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterTileComponent } from './letter-tile.component';

import { Letter } from 'src/app/classes/letter';

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
    
    component.letter = new Letter('a');

    fixture.detectChanges();
  });

  it('should create', () => {
    component.letter = new Letter('a');
    expect(component).toBeTruthy();
  });
});
