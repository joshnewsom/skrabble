import { SquareComponent } from 'src/app/components/square/square.component';

import { SkrabbleWord } from 'src/app/classes/skrabble-word';

export class SkrabbleMove {
  invalid?: boolean;
  score?: number;
  // squares: SquareComponent[];
  newSquares: SquareComponent[];
  direction: 'row' | 'column' | 'single';
  words?: SkrabbleWord[];

  constructor(newSquares: SquareComponent[]) {
    this.newSquares = newSquares;
  }
}
