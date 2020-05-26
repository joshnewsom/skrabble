import { Component, OnInit, ViewChildren} from '@angular/core';

import { SquareComponent } from 'src/app/components/square/square.component';

import { DragService } from 'src/app/services/drag/drag.service';

@Component({
  selector: 'sk-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  @ViewChildren(SquareComponent) squares;

  constructor(private dragService: DragService) { }

  ngOnInit(): void {

  }

}
