import { Injectable } from '@angular/core';

import { ScoreService } from 'src/app/services/score.service';

import { GameBoardComponent } from 'src/app/components/game-board/game-board.component';
import { SquareComponent } from 'src/app/components/square/square.component';

import { SkrabbleMove } from 'src/app/classes/skrabble-move';
import { SkrabbleWord } from 'src/app/classes/skrabble-word';

@Injectable({
  providedIn: 'root'
})
export class MovesService {

  constructor(
    private scoreService: ScoreService
  ) { }

  analyzeMove(move: SkrabbleMove, board: GameBoardComponent): SkrabbleMove {
    const directionValid = this.validateDirection(move);
    console.log('directionValid:', directionValid);

    if (!directionValid) {
      move.invalid = true;
      return move;
    }

    // make sure squares are in order
    console.time('sort');
    move.newSquares.sort((a, b) => {
      if (a.row === b.row) {
        return a.column - b.column;
      } else {
        return a.row - b.row;
      }
    });
    console.timeEnd('sort');

    move.words = this.getWords(move, board);

    console.log('move:', move);
    console.log('move.words:', move.words);

    move.score = move.words.reduce((accumulator: number, word: SkrabbleWord) => {
      return accumulator + word.score;
    }, 0);

    console.log('move.score:', move.score);

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
    let words = [ ];

    let firstSquare: SquareComponent;
    let rowWord: SkrabbleWord;
    let columnWord: SkrabbleWord;

    console.time('getWords');
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
    console.timeEnd('getWords');

    console.log('words:', words);
    return words;
  }

  validateContinuity(newSquares: SquareComponent[], board: GameBoardComponent) {

  }

  validateDirection(move: SkrabbleMove) {
    let newSquares = move.newSquares;
    console.time('validateDirection')
    if (newSquares.length === 1) {
      console.timeEnd('validateDirection')
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

    console.timeEnd('validateDirection')
    return sameRow || sameColumn;
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
