import { SquareComponent } from 'src/app/components/square/square.component';

export class SkrabbleWord {
  public connected: boolean;
  public letters: string[] = [ ];
  public score: number;

  constructor(squares: SquareComponent[]) {
    this.connected = false;
    this.score = 0;

    let wordMultiplier = 1;

    squares.forEach(sq => {
      this.letters.push(sq.tile.letter);

      let value = sq.tile.value;

      if (!sq.tile.locked) {
        switch (sq.multiplier) {
          case '2L':
          value *= 2;
          break;

          case '3L':
          value *= 3;
          break;

          case '2W':
          wordMultiplier = 2;
          break;

          case '3W':
          wordMultiplier = 3;
          break;

          default:
          break;
        }
      } else {
        this.connected = true;
      }

      this.score += value;
    });

    this.score *= wordMultiplier;
  }
}
