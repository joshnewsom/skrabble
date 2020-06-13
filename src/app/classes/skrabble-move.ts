import { SquareComponent } from 'src/app/components/square/square.component';

import { SkrabbleWord } from 'src/app/classes/skrabble-word';

export class SkrabbleMove {
  direction: 'row' | 'column' | 'single';
  invalid?: boolean;
  isFirstMove?: boolean;
  newSquares: SquareComponent[];
  score?: number;
  words?: SkrabbleWord[];

  constructor(newSquares: SquareComponent[]) {
    this.newSquares = newSquares;
  }
}
