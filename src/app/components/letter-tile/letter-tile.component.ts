import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewRef } from '@angular/core';

import { DragService } from 'src/app/services/drag/drag.service';

import { values } from 'src/app/constants';

interface TileStyle {
  position?: string;
  boxShadow?: string;
  'left.px'?: number;
  pointerEvents?: string;
  'top.px'?: number;
  zIndex?: number;
}

@Component({
  selector: 'sk-letter-tile',
  templateUrl: './letter-tile.component.html',
  styleUrls: ['./letter-tile.component.scss']
})
export class LetterTileComponent implements AfterViewInit, OnInit {

  @Input() letter: string;

  @ViewChild('tile', { static: true }) tile: ElementRef;

  public style: TileStyle = { };
  public value: number;
  public viewRef: ViewRef;

  constructor(
    private dragService: DragService
  ) { }

  ngOnInit(): void {
    if (this.letter === '_') {
      this.letter = '';
      this.value = 0;
    } else {
      this.letter = this.letter.toUpperCase();
      this.value = values[this.letter];
    }
  }

  ngAfterViewInit() {
    const x = Math.floor(Math.random() * 100);
    const y = Math.floor(Math.random() * 100);

    this.tile.nativeElement.style.backgroundPosition = `${x}% ${y}%`;
  }

  onMousedown(event: MouseEvent) {
    this.dragService.startDragging(this, event);
  }

}
