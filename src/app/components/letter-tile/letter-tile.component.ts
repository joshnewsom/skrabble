import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { Letter } from 'src/app/classes/letter';

@Component({
  selector: 'sk-letter-tile',
  templateUrl: './letter-tile.component.html',
  styleUrls: ['./letter-tile.component.scss']
})
export class LetterTileComponent implements OnInit {

  @Input() letter: Letter;

  @ViewChild('tile', { static: true }) tile: ElementRef;

  public displayLetter: string;

  constructor() { }

  ngOnInit(): void {
    if (this.letter.char === '_') {
      // JTN don't display anything for blank tiles
      this.displayLetter = ' ';
    } else {
      this.displayLetter = this.letter.char.toUpperCase();
    }

  }

  ngAfterViewInit() {
    let x = Math.floor(Math.random() * 100),
      y = Math.floor(Math.random() * 100);
    this.tile.nativeElement.style.backgroundPosition = `${x}% ${y}%`
  }

}
