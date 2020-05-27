import { Component, OnInit, QueryList, ViewChildren} from '@angular/core';

import { LetterTileComponent } from 'src/app/components/letter-tile/letter-tile.component';
import { SquareComponent } from 'src/app/components/square/square.component';

import { DragService } from 'src/app/services/drag/drag.service';
import { MovesService } from 'src/app/services/moves/moves.service';
import { ScoreService } from 'src/app/services/score.service';

import { SkrabbleMove } from 'src/app/classes/skrabble-move';

import { DropEvent } from 'src/app/services/drag/drop-event.interface';


@Component({
  selector: 'sk-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  @ViewChildren(SquareComponent) squares: QueryList<SquareComponent>;

  constructor(
    private dragService: DragService,
    private movesService: MovesService,
    private scoreService: ScoreService
  ) { }

  ngOnInit(): void {
    this.dragService.onDropTile.subscribe((event: DropEvent) => {
      setTimeout(() => {
        let _squares = this.squares.filter((item) => item.tile !== undefined);

        const move = new SkrabbleMove(_squares);
        console.time('analyze')
        this.movesService.analyzeMove(move, this);
        console.timeEnd('analyze')
        console.log('move:', move);

        if (move.invalid) {
          console.log('** INVALID MOVE **');
        }
      });
    });

  }

  ngAfterViewInit() {
    this.squares.forEach((sq, i) => {
      sq.row = Math.floor(i / 15);
      sq.column = i % 15;
    });
  }
}
