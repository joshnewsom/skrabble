import { Injectable } from '@angular/core';

import { Player } from 'src/app/classes/player';

@Injectable()
export class PlayerService {

  public player?: Player;

  constructor() { }

  setPlayer(player: Player) {
    this.player = player;
  }
}
