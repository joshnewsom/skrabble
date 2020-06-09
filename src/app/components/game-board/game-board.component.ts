import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';

import { SquareComponent } from 'src/app/components/square/square.component';


@Component({
  selector: 'sk-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements AfterViewInit, OnInit {

  @ViewChildren(SquareComponent) squares: QueryList<SquareComponent>;

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.squares.forEach((sq, i) => {
      sq.row = Math.floor(i / 15);
      sq.column = i % 15;
    });
  }

  getSquare(row: number, column: number) {
    if (row > 14 || row < 0 || typeof row !== 'number') {
      throw new RangeError(`Invalid row: ${row}`);
    }
    if (column > 14 || column < 0 || typeof column !== 'number') {
      throw new RangeError(`Invalid column: ${column}`);
    }

    const index = row * 15 + column;
    return this.squares.toArray()[index];
  }
}
