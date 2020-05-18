export class LetterSack {

  public letters: string[];

  constructor(letters?: string[]) {
    if (letters) {
      this.letters = letters;
    }
  }

  draw(num: number = 1) {
    if (this.letters.length >= num) {
      return this.letters.splice(0, num);
    } else {
      throw new Error('Not enough letters remaining');
    }
  }

}
