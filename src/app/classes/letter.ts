import { values } from 'src/app/constants';

export class Letter {

  public char: string;
  public value: number;

  constructor(char: string) {
    this.char = char;
    this.value = values[char.toLowerCase()];
  }
}
