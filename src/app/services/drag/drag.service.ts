import { Injectable } from '@angular/core';

import { LetterTileComponent } from 'src/app/components/letter-tile/letter-tile.component';

@Injectable({
  providedIn: 'root'
})
export class DragService {

  public letterTile: LetterTileComponent;

  private boundOnDrag: (event: MouseEvent) => void;
  private boundOnMouseup: (event: MouseEvent) => void;

  constructor() {
    this.boundOnDrag = onDrag.bind(this);
    this.boundOnMouseup = onMouseup.bind(this);
  }

  public startDragging(letterTile: LetterTileComponent, event: MouseEvent) {
    this.letterTile = letterTile;

    document.addEventListener('mousemove', this.boundOnDrag);
    document.addEventListener('mouseup', this.boundOnMouseup);

    this.letterTile.style.position = 'fixed';
    this.letterTile.style['left.px'] = event.clientX;
    this.letterTile.style['top.px'] = event.clientY;
    this.letterTile.style.zIndex = 1;
  }

}

function onDrag(event: MouseEvent) {
  this.letterTile.style['left.px'] = event.clientX;
  this.letterTile.style['top.px'] = event.clientY;
}

function onMouseup(event: MouseEvent) {
  document.removeEventListener('mousemove', this.boundOnDrag);
  document.removeEventListener('mouseup', this.boundOnMouseup);

  this.letterTile.style.position = 'static';
}
