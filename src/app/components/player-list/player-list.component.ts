import { Component, Input, OnInit } from '@angular/core';

import { GameState } from 'src/app/classes/game-state';


@Component({
  selector: 'sk-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {

  @Input() game: GameState;

  constructor() { }

  ngOnInit(): void { }
}
