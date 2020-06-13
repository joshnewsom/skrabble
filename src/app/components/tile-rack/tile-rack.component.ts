import {
  Component,
  ComponentFactoryResolver,
  Input,
  QueryList,
  ViewChildren
} from '@angular/core';

import { LetterTileComponent } from 'src/app/components/letter-tile/letter-tile.component';

import { TileDropZoneDirective } from 'src/app/directives/tile-drop-zone.directive';

import { LetterSack } from 'src/app/classes/letter-sack';

@Component({
  selector: 'sk-tile-rack',
  templateUrl: './tile-rack.component.html',
  styleUrls: ['./tile-rack.component.scss']
})
export class TileRackComponent {

  @Input() letterSack: LetterSack;

  @ViewChildren(TileDropZoneDirective) dropZones: QueryList<TileDropZoneDirective>;

  private letterTileFactory = this.componentFactoryResolver.resolveComponentFactory(LetterTileComponent);
  public tiles: LetterTileComponent[] = [ ];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  draw() {
    const need = 7 - this.tiles.length;
    const remaining = this.letterSack.letters.length;
    const drawNum = need >= remaining ? remaining : need;
    const newLetters = this.letterSack.draw(drawNum);
    const emptyZones = this.dropZones.filter(zone => !zone.tile);

    emptyZones.forEach(zone => {
      const letter = newLetters.pop();
      const newComponent = zone.insertionPoint.createComponent(this.letterTileFactory);
      newComponent.instance.letter = letter;
      newComponent.instance.viewRef = newComponent.hostView;
      zone.tile = newComponent.instance;
      this.tiles.push(newComponent.instance);
    });
  }

  onPickUpTile(letterTile: LetterTileComponent) {
    const index = this.tiles.indexOf(letterTile);
    if (index >= 0) {
      this.tiles.splice(index, 1);
    }
  }

  onDropTile(letterTile: LetterTileComponent) {
    this.tiles.push(letterTile);
  }

}
