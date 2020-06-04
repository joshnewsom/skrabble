import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { LetterTileComponent } from 'src/app/components/letter-tile/letter-tile.component';

import { DropEvent } from 'src/app/services/drag/drop-event.interface';

@Injectable({
  providedIn: 'root'
})
export class DragService {

  public letterTile: LetterTileComponent;
  public onDropTile = new Subject<DropEvent>();
  public onPickUpTile = new Subject<LetterTileComponent>();

  private boundOnDrag: (event: MouseEvent) => void;
  private boundOnMouseup: (event: MouseEvent) => void;
  private xOffset: number;
  private yOffset: number;

  constructor() {
    this.boundOnDrag = onDrag.bind(this);
    this.boundOnMouseup = onMouseup.bind(this);
  }

  public startDragging(letterTile: LetterTileComponent, event: MouseEvent) {

    this.onPickUpTile.next(letterTile);

    // if (letterTile.square) {
    //   letterTile.square.tile = undefined;
    // }
    //
    // letterTile.square = undefined;

    const boundingRect = letterTile.tile.nativeElement.getBoundingClientRect();
    this.xOffset = event.clientX - boundingRect.left;
    this.yOffset = event.clientY - boundingRect.top;

    this.letterTile = letterTile;

    document.addEventListener('mousemove', this.boundOnDrag);
    document.addEventListener('mouseup', this.boundOnMouseup);

    this.letterTile.style.boxShadow = '3px 3px 2px rgba(0, 0, 0, 0.5)';
    this.letterTile.style.position = 'fixed';
    this.letterTile.style['left.px'] = event.clientX - this.xOffset;
    this.letterTile.style['top.px'] = event.clientY - this.yOffset;
    this.letterTile.style.zIndex = 1;
    this.letterTile.style.pointerEvents = 'none';
  }

}

function onDrag(event: MouseEvent) {
  this.letterTile.style['left.px'] = event.clientX - this.xOffset;
  this.letterTile.style['top.px'] = event.clientY - this.yOffset;
}

function onMouseup(event: MouseEvent) {
  document.removeEventListener('mousemove', this.boundOnDrag);
  document.removeEventListener('mouseup', this.boundOnMouseup);

  this.letterTile.style.boxShadow = 'none';
  this.letterTile.style['left.px'] = 0;
  this.letterTile.style.pointerEvents = 'auto';
  this.letterTile.style.position = 'relative';
  this.letterTile.style['top.px'] = 0;
  this.letterTile.style.zIndex = 0;

  this.onDropTile.next({ element: event.target, letterTile: this.letterTile });

  this.letterTile = null;
}
