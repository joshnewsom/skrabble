import { Component, Input, OnInit } from '@angular/core';

import { GameState } from 'src/app/classes/game-state';

@Component({
  selector: 'sk-game-list-item',
  templateUrl: './game-list-item.component.html',
  styleUrls: ['./game-list-item.component.scss']
})
export class GameListItemComponent implements OnInit {

  // public rows: string[][];

  public rows: { letter: string, class?: string }[][]

  @Input() game: GameState;

  constructor() { }

  ngOnInit(): void {

    const arr = this.game.boardLayout.split(',');

    const rows = [ ];

    for (let i = 0; i < arr.length; i += 15) {
      rows.push(arr.slice(i, i + 15).map((letter, j) => ({ letter, class: getSquareClassByIndex(i + j) })));
    }

    this.rows = rows;

  }

}


function getSquareClassByIndex(index: number): string | null {
  switch (index) {
    case 0:
    case 7:
    case 14:
    case 105:
    case 119:
    case 210:
    case 224:
      return 'triple-word';

    case 20:
    case 24:
    case 76:
    case 80:
    case 84:
    case 88:
    case 136:
    case 140:
    case 144:
    case 148:
    case 200:
    case 204:
      return 'triple-letter';

    case 16:
    case 28:
    case 32:
    case 42:
    case 48:
    case 56:
    case 64:
    case 70:
    case 112:
    case 154:
    case 160:
    case 168:
    case 176:
    case 182:
    case 192:
    case 196:
    case 208:
      return 'double-word';

    case 3:
    case 11:
    case 36:
    case 38:
    case 45:
    case 52:
    case 59:
    case 92:
    case 96:
    case 98:
    case 102:
    case 108:
    case 116:
    case 122:
    case 126:
    case 128:
    case 132:
    case 165:
    case 172:
    case 179:
    case 186:
    case 188:
    case 213:
    case 221:
      return 'double-letter';


    default:
      return null;
  }
}