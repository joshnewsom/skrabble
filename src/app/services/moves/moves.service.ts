import { Injectable } from '@angular/core';

import { ScoreService } from 'src/app/services/score.service';

import { GameBoardComponent } from 'src/app/components/game-board/game-board.component';
import { SquareComponent } from 'src/app/components/square/square.component';

import { SkrabbleMove } from 'src/app/classes/skrabble-move';

@Injectable({
  providedIn: 'root'
})
export class MovesService {

  constructor(
    private scoreService: ScoreService
  ) { }

  analyzeMove(move: SkrabbleMove, board: GameBoardComponent): SkrabbleMove {
    if (this.isRowMove(move.squares)) {

      const row = move.squares[0].row;
      const columns = move.squares.map(sq => sq.column);

      const start = row * 15 + columns[0];
      const end = row * 15 + columns[columns.length -1];

      for (let i = start; i <= end; i++) {
        const tile = board.squares.toArray()[i].tile;

        if (!tile) {
          move.invalid = true;
          break;
        };

        console.log(`${tile.letter} = ${tile.value}`);
      }

    } else if (this.isColumnMove(move.squares)) {

      const column = move.squares[0].column;
      const rows = move.squares.map(sq => sq.row);

      const start = rows[0] * 15 + column;
      const end = rows[rows.length - 1] * 15 + column;

      for (let i = start; i <= end; i += 15) {
        let tile = board.squares.toArray()[i].tile;

        if (!tile) {
          move.invalid = true;
          break;
        };

        console.log(`${tile.letter} = ${tile.value}`);
      }

    } else {

      move.invalid = true;

    }

    if (!move.invalid) {
      move.score = this.scoreService.getScore(move.squares);
    }

    return move;
  }


  isRowMove(squares: SquareComponent[]) {
    let row = squares[0].row;
    for (let i = 1; i < squares.length; i++) {
      if (squares[i].row !== row) {
        return false;
      }
    }
    return true;
  }


  isColumnMove(squares: SquareComponent[]) {
    let column = squares[0].column;
    for (let i = 1; i < squares.length; i++) {
      if (squares[i].column !== column) {
        return false;
      }
    }
    return true;
  }

}
