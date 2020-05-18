import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { values } from 'src/app/constants';

@Component({
  selector: 'sk-letter-tile',
  templateUrl: './letter-tile.component.html',
  styleUrls: ['./letter-tile.component.scss']
})
export class LetterTileComponent implements AfterViewInit, OnInit {

  @Input() letter: string;

  @ViewChild('tile', { static: true }) tile: ElementRef;

  public value: number;
  public displayLetter: string;

  constructor() { }

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

}
