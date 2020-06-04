import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';

import { SquareComponent } from 'src/app/components/square/square.component';


@Component({
  selector: 'sk-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  @ViewChildren(SquareComponent) squares: QueryList<SquareComponent>;

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.squares.forEach((sq, i) => {
      sq.row = Math.floor(i / 15);
      sq.column = i % 15;
    });
  }
}
