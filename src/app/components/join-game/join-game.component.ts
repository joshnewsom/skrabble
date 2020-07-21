import { environment as env } from 'src/environments/environment';

import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PlayerService } from 'src/app/services/player/player.service';
import { UserService } from 'src/app/services/user/user.service';

import { GameState } from 'src/app/classes/game-state';
import { Player } from 'src/app/classes/player';
import { User } from 'src/app/classes/user';


@Component({
  selector: 'sk-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss']
})
export class JoinGameComponent implements OnInit {

  @Input() game: GameState;

  public joined: boolean = false;
  // public player?: Player;
  public userIsHost?: boolean;
  public user: User;

  constructor(
    private http: HttpClient,
    private playerService: PlayerService,
    private userService: UserService
  ) {
    this.user = this.userService.user;
  }

  ngOnInit(): void {
    // check if user/player has already joined this game
    if (this.user) {
      this.joined = this.game.players.some(p => p.user.id === this.user.id);
      this.userIsHost = this.game.host.id === this.user.id;
    }
  }


  joinGame() {
    this.joined = true;
    this.http.post(`${env.apiRoute}/game/${this.game.gameId}/join`, { user: this.user })
      .subscribe(_res => { });
  }


  startGame() {
    console.log('starting game!')
    this.http.post(`${env.apiRoute}/game/${this.game.gameId}/start`, { })
      .subscribe((_res) => { })
  }

}
