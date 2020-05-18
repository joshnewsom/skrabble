import { Component, OnInit } from '@angular/core';

import { LettersService } from 'src/app/services/letters/letters.service';

import { LetterSack } from 'src/app/classes/letter-sack';

@Component({
  selector: 'sk-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  public letterSack: LetterSack;
  public testLetters: any;

  constructor(
    private lettersService: LettersService
  ) { }

  ngOnInit(): void {
    const letters = this.lettersService.getAllLetters();
    this.lettersService.shuffle(letters);
    this.letterSack = new LetterSack(letters);

    const testLetters = this.letterSack.draw(7);

    this.testLetters = testLetters;
  }

}
