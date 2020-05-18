import { Injectable } from '@angular/core';

import { counts } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class LettersService {

  constructor() { }

  getAllLetters() {
    const letters = [ ];

    for (const letter in counts) {
      if (counts.hasOwnProperty(letter)) {
        for (let i = 0; i < counts[letter]; i++) {
          letters.push(letter);
        }
      }
    }

    return letters;
  }

  shuffle(letters: string[]): string[] {
    const temp = letters.slice();

    letters.length = 0;

    while (temp.length) {
      const index = Math.floor(Math.random() * temp.length);
      letters.push(temp.splice(index, 1)[0]);
    }

    return letters;
  }
}
