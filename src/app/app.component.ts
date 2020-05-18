import { Component, ViewChild } from '@angular/core';

import { LettersService } from 'src/app/services/letters/letters.service';

@Component({
  selector: 'sk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private LettersService: LettersService) { }
  title = 'skrabble';

  letters: any;

  ngOnInit() {
    this.letters = this.LettersService.getAllLetters();
    this.LettersService.shuffle(this.letters);
  }
}
