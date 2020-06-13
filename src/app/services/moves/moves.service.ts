import { Injectable } from '@angular/core';

import { GameBoardComponent } from 'src/app/components/game-board/game-board.component';
import { SquareComponent } from 'src/app/components/square/square.component';

import { SkrabbleMove } from 'src/app/classes/skrabble-move';
import { SkrabbleWord } from 'src/app/classes/skrabble-word';

@Injectable({
  providedIn: 'root'
})
export class MovesService {

  constructor( ) { }

  analyzeMove(move: SkrabbleMove, board: GameBoardComponent): SkrabbleMove {
    const directionValid = this.validateDirection(move);

    if (!directionValid) {
      move.invalid = true;
      return move;
    }

    // make sure squares are in order
    move.newSquares.sort((a, b) => {
      if (a.row === b.row) {
        return a.column - b.column;
      } else {
        return a.row - b.row;
      }
    });

    const noGaps = this.validateNoGaps(move, board);

    if (!noGaps) {
      move.invalid = true;
      return move;
    }

    // first move must use center square
    if (move.isFirstMove) {
      if (!this.validateCenter(move)) {
        move.invalid = true;
        return move;
      }
    }

    move.words = this.getWords(move, board);

    // moves after the first must be connected to existing words
    if (!move.isFirstMove) {
      // all words should have .connected = true
      const allWordsConnected = this.validateWordConnected(move);

      if (!allWordsConnected) {
        move.invalid = true;
        return move;
      }
    }

    move.score = move.words.reduce((accumulator: number, word: SkrabbleWord) => {
      return accumulator + word.score;
    }, 0);

    return move;
  }

  checkDirection(direction: 'up' | 'down' | 'right' | 'left', square: SquareComponent, board: GameBoardComponent): SquareComponent[] {
    const squares = [ ];

    let { row, column } = square;

    const vertical = (direction === 'up' || direction === 'down');
    const increasing = (direction === 'down' || direction === 'right');

    const axis = vertical ? 'row' : 'column';
    const increment = increasing ? 1 : -1;
    const arrayOp = increasing ? 'push' : 'unshift';

    axis === 'row' ? row += increment : column += increment;

    while (row >= 0 && row <= 14 && column >= 0 && column <= 14) {
      const nextSquare = board.getSquare(row, column);
      if (nextSquare.tile) {
        squares[arrayOp](nextSquare);
        axis === 'row' ? row += increment : column += increment;
      } else {
        break;
      }
    }

    return squares;
  }

  getRowWord(square: SquareComponent, board: GameBoardComponent): SkrabbleWord {
    const rowSquares = [ ];

    rowSquares.push(...this.checkDirection('left', square, board));
    rowSquares.push(square);
    rowSquares.push(...this.checkDirection('right', square, board));

    return new SkrabbleWord(rowSquares);
  }

  getColumnWord(square: SquareComponent, board: GameBoardComponent): SkrabbleWord {
    const columnSquares = [ ];

    columnSquares.push(...this.checkDirection('up', square, board));
    columnSquares.push(square);
    columnSquares.push(...this.checkDirection('down', square, board));

    return new SkrabbleWord(columnSquares);
  }

  getWords(move: SkrabbleMove, board: GameBoardComponent) {
    const words = [ ];

    let firstSquare: SquareComponent;
    let rowWord: SkrabbleWord;
    let columnWord: SkrabbleWord;

    switch (move.direction) {
      case 'single':
        firstSquare = move.newSquares[0];
        rowWord = this.getRowWord(firstSquare, board);
        columnWord = this.getColumnWord(firstSquare, board);
        if (rowWord.letters.length > 1) {
          words.push(rowWord);
        }
        if (columnWord.letters.length > 1) {
          words.push(columnWord);
        }
        break;

      case 'row':
        firstSquare = move.newSquares[0];
        rowWord = this.getRowWord(firstSquare, board);
        words.push(rowWord);

        move.newSquares.forEach(square => {
          columnWord = this.getColumnWord(square, board);
          if (columnWord.letters.length > 1) {
            words.push(columnWord);
          }
        });
        break;

      case 'column':
        firstSquare = move.newSquares[0];
        columnWord = this.getColumnWord(firstSquare, board);
        words.push(columnWord);

        move.newSquares.forEach(square => {
          rowWord = this.getRowWord(square, board);
          if (rowWord.letters.length > 1) {
            words.push(rowWord);
          }
        });
        break;

      default:
        throw new Error('invalid move direction');
    }

    return words;
  }

  validateNoGaps(move: SkrabbleMove, board: GameBoardComponent) {
    if (move.direction === 'single') {
      return true;
    }

    const first = move.newSquares[0];
    const last = move.newSquares[move.newSquares.length - 1];
    const start = move.direction === 'row' ? first.column : first.row;
    const end = move.direction === 'row' ? last.column : last.row;

    for (let i = start; i <= end; i++) {
      const row = move.direction === 'row' ? first.row : i;
      const column = move.direction === 'column' ? first.column : i;
      const square = board.getSquare(row, column);
      if (!square.tile) {
        return false;
      }
    }

    return true;
  }

  validateDirection(move: SkrabbleMove) {
    const newSquares = move.newSquares;
    if (newSquares.length === 1) {
      move.direction = 'single';
      return true;
    }

    let sameRow = true;
    const firstRow = newSquares[0].row;
    for (let i = 1; i < newSquares.length; i++) {
      if (newSquares[i].row !== firstRow) {
        sameRow = false;
      }
    }

    let sameColumn = true;
    const firstColumn = newSquares[0].column;
    for (let i = 1; i < newSquares.length; i++) {
      if (newSquares[i].column !== firstColumn) {
        sameColumn = false;
      }
    }

    if (sameRow) {
      move.direction = 'row';
    } else if (sameColumn) {
      move.direction = 'column';
    }

    return sameRow || sameColumn;
  }

  validateCenter(move: SkrabbleMove) {
    for (const sq of move.newSquares) {
      if (sq.center) {
        return true;
      }
    }
    return false;
  }


  // TODO: make this work for T-intersection words
  validateWordConnected(move: SkrabbleMove) {
    for (const word of move.words) {
      if (word.connected) {
        return true;
      }
    }
    return false;
  }
}
