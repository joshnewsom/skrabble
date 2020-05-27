import { SquareComponent } from 'src/app/components/square/square.component';

export class SkrabbleMove {
  invalid?: boolean;
  squares: SquareComponent[];

  constructor(squares: SquareComponent[]) {
    this.squares = squares;
  }
}
