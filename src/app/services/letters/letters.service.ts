import { Injectable } from '@angular/core';

import { Letter } from 'src/app/classes/letter';

import { counts } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class LettersService {

  constructor() { }

  getAllLetters() {
    const letters = [ ];

    for (const char in counts) {
      if (counts.hasOwnProperty(char)) {
        for (let i = 0; i < counts[char]; i++) {
          letters.push(new Letter(char));
        }
      }
    }

    return letters;
  }

  shuffle(letters: Letter[]): Letter[] {
    const temp = letters.slice();

    letters.length = 0;

    while (temp.length) {
      const index = Math.floor(Math.random() * temp.length);
      letters.push(temp.splice(index, 1)[0]);
    }

    return letters;
  }
}
