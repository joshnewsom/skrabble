import { Component, OnInit } from '@angular/core';

import { LettersService } from 'src/app/services/letters/letters.service';

@Component({
  selector: 'sk-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  public letterSack: any;
  public testLetters: any;

  constructor(
    private lettersService: LettersService
  ) { }

  ngOnInit(): void {
    const letters = this.lettersService.getAllLetters();
    this.lettersService.shuffle(letters);

    const testLetters = letters.slice(0, 7);

    this.testLetters = testLetters;
  }

}
