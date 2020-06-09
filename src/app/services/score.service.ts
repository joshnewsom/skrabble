import { Injectable } from '@angular/core';

import { SquareComponent } from 'src/app/components/square/square.component';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor() { }

  getScore(squares: SquareComponent[]) {
    let score = 0;
    let wordMultiplier = 1;

    squares.forEach(sq => {
      let value = sq.tile.value;

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

      score += value;
    });

    score *= wordMultiplier;

    return score;
  }
}
