import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { LetterTileComponent } from 'src/app/components/letter-tile/letter-tile.component';

import { TileDropZoneDirective } from 'src/app/directives/tile-drop-zone.directive';

@Component({
  selector: 'sk-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {

  @Input() center?: boolean;
  @Input() multiplier?: string;
  @Input() row?: number;
  @Input() column?: number;

  @Output() onTileAdded = new EventEmitter<LetterTileComponent>();
  @Output() onTileRemoved = new EventEmitter<LetterTileComponent>();

  @ViewChild(TileDropZoneDirective) public dropZone: TileDropZoneDirective;

  public locked?: boolean = false;
  public multiplierClass?: string;
  public textContent?: string;
  public tile?: LetterTileComponent;

  constructor() { }

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

  onDrop(tile: LetterTileComponent) {
    this.tile = tile;
    tile.square = this;
    this.onTileAdded.emit(this.tile);
  }

}
