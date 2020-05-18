import { Letter } from './letter';

import { counts } from 'src/app/constants';

describe('Letter', () => {

  it('should create letter tiles with correct values', () => {

    const onePointers = [ 'A', 'E', 'I', 'O', 'U', 'L', 'N', 'S', 'T', 'R' ];
    onePointers.forEach(char => {
      const tile = new Letter(char);
      expect(tile.value).toEqual(1);
    });

    const twoPointers = [ 'D', 'G' ];
    twoPointers.forEach(char => {
      const tile = new Letter(char);
      expect(tile.value).toEqual(2);
    });

    const threePointers = [ 'B', 'C', 'M', 'P' ];
    threePointers.forEach(char => {
      const tile = new Letter(char);
      expect(tile.value).toEqual(3);
    });

    const fourPointers = [ 'F', 'H', 'V', 'W', 'Y' ];
    fourPointers.forEach(char => {
      const tile = new Letter(char);
      expect(tile.value).toEqual(4);
    });

    const fivePointers = [ 'K' ];
    fivePointers.forEach(char => {
      const tile = new Letter(char);
      expect(tile.value).toEqual(5);
    });

    const eightPointers = [ 'J', 'X' ];
    eightPointers.forEach(char => {
      const tile = new Letter(char);
      expect(tile.value).toEqual(8);
    });

    const tenPointers = [ 'Q', 'Z' ];
    tenPointers.forEach(char => {
      const tile = new Letter(char);
      expect(tile.value).toEqual(10);
    });

    // blanks are worth zero
    expect(new Letter('_').value).toEqual(0);

  });

  it('should have total face value of 187', () => {
    // TODO: generate correct number of each tile and check total
    let total = 0;

    for (const char in counts) {
      if (counts.hasOwnProperty(char)) {
        for (let i = 0; i < counts[char]; i++) {
          total += new Letter(char).value;
        }
      }
    }

    expect(total).toEqual(187);
  });

});
