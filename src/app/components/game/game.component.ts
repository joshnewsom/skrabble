import { Component, OnInit, ViewChild } from '@angular/core';

import { DragService } from 'src/app/services/drag/drag.service';
import { GameService } from 'src/app/services/game/game.service';
import { MovesService } from 'src/app/services/moves/moves.service';

import { GameBoardComponent } from 'src/app/components/game-board/game-board.component';
import { TileRackComponent } from 'src/app/components/tile-rack/tile-rack.component';

import { LetterSack } from 'src/app/classes/letter-sack';
import { SkrabbleMove } from 'src/app/classes/skrabble-move';

import { DropEvent } from 'src/app/services/drag/drop-event.interface';

@Component({
  selector: 'sk-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [ GameService ]
})
export class GameComponent implements OnInit {

  @ViewChild(TileRackComponent) tileRack: TileRackComponent;
  @ViewChild(GameBoardComponent) gameBoard: GameBoardComponent;

  public letterSack: LetterSack;
  public testLetters: any;
  public potentialMove: SkrabbleMove;
  public totalScore: number = 0;

  constructor(
    private dragService: DragService,
    private gameService: GameService,
    private movesService: MovesService
  ) { }

  ngOnInit(): void {
    this.letterSack = new LetterSack();

    this.dragService.onDropTile.subscribe((event: DropEvent) => {
      setTimeout(() => {
        let _squares = this.gameBoard.squares.filter(sq => sq.tile !== undefined && !sq.locked);

        if (!_squares.length) {
          return this.potentialMove = undefined;
        }

        const move = new SkrabbleMove(_squares);
        this.movesService.analyzeMove(move, this.gameBoard);

        this.potentialMove = move;

        if (move.invalid) {
          console.log('** INVALID MOVE **');
        }
      });
    });
  }

  submitMove() {
    if (this.potentialMove && !this.potentialMove.invalid) {
      this.totalScore += this.potentialMove.score;

      this.potentialMove.squares.forEach(sq => {
        sq.locked = true;
      });

      this.potentialMove = undefined;

      console.log('this.tileRack:', this.tileRack);
    }
  }

}
