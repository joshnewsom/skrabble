import { SquareComponent } from 'src/app/components/square/square.component';

export class SkrabbleMove {
  invalid?: boolean;
  score?: number;
  squares: SquareComponent[];

  constructor(squares: SquareComponent[]) {
    this.squares = squares;
  }
}
