import { LetterTileComponent } from 'src/app/components/letter-tile/letter-tile.component';

export interface DropEvent {
  element: HTMLElement;
  letterTile: LetterTileComponent;
}