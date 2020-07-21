import { environment as env } from 'src/environments/environment';

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import * as io from 'socket.io-client';

import { DragService } from 'src/app/services/drag/drag.service';
import { MovesService } from 'src/app/services/moves/moves.service';
import { PlayerService } from 'src/app/services/player/player.service';
import { UserService } from 'src/app/services/user/user.service';

import { GameBoardComponent } from 'src/app/components/game-board/game-board.component';
import { TileRackComponent } from 'src/app/components/tile-rack/tile-rack.component';

import { GameState } from 'src/app/classes/game-state';
// import { LetterSack } from 'src/app/classes/letter-sack';
import { SkrabbleMove } from 'src/app/classes/skrabble-move';

import { Player } from 'src/app/classes/player';
import { User } from 'src/app/classes/user';

import { DropEvent } from 'src/app/services/drag/drop-event.interface';

// type Ack = () => void

interface DrawForTurnsResult {
  players: {
    [playerId: string]: string;
  };
  winner?: string;
}


@Component({
  selector: 'sk-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [ PlayerService ]
})
export class GameComponent implements OnInit {

  @ViewChild(TileRackComponent) tileRack: TileRackComponent;
  @ViewChild(GameBoardComponent) gameBoard: GameBoardComponent;

  public game: GameState;
  public gameId: string;
  public gameNotFound: boolean;
  public inProgress = false;
  public testLetters: any;
  public player: Player;
  public potentialMove: SkrabbleMove;
  public totalScore = 0;
  public turns = 0;
  public user: User;

  private socket: SocketIOClient.Socket;


  constructor(
    private dragService: DragService,
    private http: HttpClient,
    private movesService: MovesService,
    private playerService: PlayerService,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.gameId = this.route.snapshot.params.id;
    this.user = this.userService.user;

    this.dragService.onDropTile.subscribe((_event: DropEvent) => {
      setTimeout(() => {
        const squares = this.gameBoard.squares.filter(sq => sq.tile !== undefined && !sq.tile.locked);

        if (!squares.length) {
          return this.potentialMove = undefined;
        }

        const move = new SkrabbleMove(squares);
        if (!this.turns) {
          move.isFirstMove = true;
        }

        this.movesService.analyzeMove(move, this.gameBoard);

        if (move.invalid) {
          console.log('** INVALID MOVE **');
        }

        this.potentialMove = move;

      });
    });

    this.socket = io(`/game?g=${this.gameId}`);

    this.socket.on('new game state', (game: GameState) => {
      this.game = game;
      this.updateBoardTiles();

      this.player = this.game.players.find(p => p.user.id === this.user.id);
      this.playerService.setPlayer(this.player);
    })

    this.socket.on('player joined', (game: GameState) => {
      this.game = game;
    });

    this.socket.on('start game', ( drawForTurnsResult: DrawForTurnsResult, game: GameState ) => {
      console.log('drawForTurnsResult:', drawForTurnsResult);
      this.game = game;

      this.player = this.game.players.find(p => p.user.id === this.user.id);
      this.playerService.setPlayer(this.player);
      this.player.hand.forEach(letter => {
        this.tileRack.createTile(letter);
      });
    });
  }

  ngAfterViewInit() {
    this.http.get(`${env.apiRoute}/game/${this.gameId}`)
      .subscribe(
        (res: { game: GameState }) => {
          this.game = res.game;
          this.player = this.game.players.find(p => p.user.id === this.user.id);

          if (this.player) {
            this.playerService.setPlayer(this.player);
            this.player.hand.forEach(letter => {
              this.tileRack.createTile(letter);
            });
          } else {
            console.log('-- no player found --')
          }

          // hacky, figure out turns nonsense -- add to game state probably
          const hasLetters = /[A-Z]/.test(this.game.boardLayout);
          if (hasLetters) {
            this.turns = 1;
          }

          setTimeout(() => {
            this.updateBoardTiles();
          });

        },
        (err) => {
          console.error(err);
          this.gameNotFound = true;
        }
      );

  }

  ngOnDestroy() {
    this.socket.close()
  }


  updateBoardTiles() {
    const letters = this.game.boardLayout.split(',');
    for (let i = 0; i < letters.length; i++) {
      if (letters[i]) {
        const row = Math.floor(i / 15);
        const column = i % 15;
        const square = this.gameBoard.getSquare(row, column);

        if (!square.tile) {
          square.insertTile(letters[i]);
        }
      }
    }
  }


  updateRackTiles() {

  }


  draw(num: number = 1) {
    if (this.game.letterSack.letters.length >= num) {
      return this.game.letterSack.letters.splice(0, num);
    } else {
      throw new Error('Not enough letters remaining');
    }
  }


  submitMove() {
    if (this.potentialMove && !this.potentialMove.invalid) {
      const submittedMove = this.potentialMove;
      this.potentialMove = undefined;
      this.totalScore += submittedMove.score;

      submittedMove.newSquares.forEach(sq => {
        sq.tile.locked = true;
      });

      const player = this.game.players.find(p => p.user.id === this.user.id);
      const lettersPlayed = submittedMove.newSquares.map(sq => sq.tile.letter);
      lettersPlayed.forEach(letter => player.hand.splice(player.hand.indexOf(letter), 1));
      player.score += submittedMove.score;

      // draw new letters
      const newLetters = this.draw(lettersPlayed.length);
      player.hand = player.hand.concat(...newLetters);
      newLetters.forEach(letter => {
        this.tileRack.createTile(letter);
      });

      // update board layout
      submittedMove.newSquares.forEach(square => {
        const index = square.row * 15 + square.column;
        this.insertLetterAtIndex(square.tile.letter, index);
      });

      // advance to next player
      const nextIndex = (this.game.players.indexOf(player) + 1) % this.game.players.length;
      player.isCurrentPlayer = false;
      this.game.players[nextIndex].isCurrentPlayer = true;

      this.socket.emit('submit move', this.game);

      this.turns++;
    }
  }


  insertLetterAtIndex(letter: string, index: number) {
    const temp = this.game.boardLayout.split(',');
    temp[index] = letter;
    this.game.boardLayout = temp.join(',');
  }

}
