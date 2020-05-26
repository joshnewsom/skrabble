import { Component, Input, OnInit } from '@angular/core';

import { LetterTileComponent } from 'src/app/components/letter-tile/letter-tile.component';

import { DragService } from 'src/app/services/drag/drag.service';

@Component({
  selector: 'sk-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {

  @Input() center?: boolean;
  @Input() multiplier?: string;

  public multiplierClass?: string;
  public textContent?: string;

  constructor(
    private dragService: DragService
  ) { }

  ngOnInit(): void {
    if (this.multiplier) {
      switch (this.multiplier) {
        case '2L':
          this.multiplierClass = 'double-letter';
          this.textContent = 'Double Letter Score';
          break;
        case '3L':
          this.multiplierClass = 'triple-letter';
          this.textContent = 'Triple Letter Score';
          break;
        case '2W':
          this.multiplierClass = 'double-word';
          if (!this.center) {
            this.textContent = 'Double Word Score';
          }
          break;
        case '3W':
          this.multiplierClass = 'triple-word';
          this.textContent = 'Triple Word Score';
          break;
      }
    }
  }

}
